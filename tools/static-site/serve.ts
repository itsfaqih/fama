import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { createSecureServer, type ServerHttp2Session } from 'node:http2';
import { tmpdir } from 'node:os';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync } from 'node:zlib';

export const distDir = fileURLToPath(new URL('../../dist', import.meta.url));

const contentTypes = new Map(
  Object.entries({
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.woff2': 'font/woff2',
  }),
);

const compressible = new Set(['.html', '.js', '.css', '.json', '.svg', '.txt']);

async function resolveFile(root: string, pathname: string): Promise<string | undefined> {
  const path = join(root, normalize(decodeURIComponent(pathname)));

  if (!path.startsWith(root)) {
    return undefined;
  }

  const info = await stat(path).catch(() => undefined);

  if (info?.isDirectory()) {
    return resolveFile(root, join(pathname, 'index.html'));
  }

  return info?.isFile() ? path : undefined;
}

async function selfSignedCertificate() {
  const dir = await mkdtemp(join(tmpdir(), 'fama-tls-'));

  const [key, cert] = [join(dir, 'key.pem'), join(dir, 'cert.pem')];

  execFileSync(
    'openssl',
    [
      'req',
      '-x509',
      '-newkey',
      'rsa:2048',
      '-nodes',
      '-days',
      '1',
      '-subj',
      '/CN=127.0.0.1',
      '-keyout',
      key,
      '-out',
      cert,
    ],
    { stdio: 'pipe' },
  );

  const pair = { key: await readFile(key), cert: await readFile(cert) };

  await rm(dir, { recursive: true });

  return pair;
}

let certificate: ReturnType<typeof selfSignedCertificate> | undefined;

/**
 * Lighthouse's simulator models a page very differently over one warm HTTP/2 connection than over
 * fresh HTTP/1.1 connections, so the protocol has to match production: HTTP/2 over TLS, as on
 * Cloudflare Pages.
 */
export async function serveDist(root = distDir) {
  certificate ??= selfSignedCertificate();

  const compressed = new Map<string, Buffer>();

  const compress = async (path: string) => {
    const body = compressed.get(path) ?? brotliCompressSync(await readFile(path));

    compressed.set(path, body);

    return body;
  };

  const server = createSecureServer(
    { ...(await certificate), allowHTTP1: true },
    (request, response) => {
      const { pathname } = new URL(request.url ?? '/', 'http://localhost');

      void resolveFile(root, pathname).then(async (path) => {
        if (!path) {
          response.writeHead(404).end();

          return;
        }

        const extension = extname(path);

        const brotli =
          compressible.has(extension) && /\bbr\b/.test(request.headers['accept-encoding'] ?? '');

        response.setHeader(
          'content-type',
          contentTypes.get(extension) ?? 'application/octet-stream',
        );

        if (brotli) {
          response.setHeader('content-encoding', 'br');
        }

        response.writeHead(200).end(brotli ? await compress(path) : await readFile(path));
      });
    },
  );

  const sessions = new Set<ServerHttp2Session>();

  server.on('session', (session) => {
    sessions.add(session);
    session.once('close', () => sessions.delete(session));
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));

  const address = server.address();

  if (!(address instanceof Object)) {
    throw new Error('A TCP server listening on a port has an address object');
  }

  return {
    url: `https://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolve) => {
        server.close(() => resolve());

        for (const session of sessions) {
          session.close();
        }
      }),
  };
}
