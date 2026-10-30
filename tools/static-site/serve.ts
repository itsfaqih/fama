import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync } from 'node:zlib';

const distDir = fileURLToPath(new URL('../../dist', import.meta.url));

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

async function resolveFile(pathname: string) {
  const path = join(distDir, normalize(decodeURIComponent(pathname)));

  if (!path.startsWith(distDir)) {
    return undefined;
  }

  const info = await stat(path).catch(() => undefined);

  if (info?.isDirectory()) {
    return resolveFile(join(pathname, 'index.html'));
  }

  return info?.isFile() ? path : undefined;
}

/** Serves dist/ the way Cloudflare Pages does: brotli for text, index.html for directories. */
export async function serveDist() {
  const server = createServer((request, response) => {
    const { pathname } = new URL(request.url ?? '/', 'http://localhost');

    void resolveFile(pathname).then(async (path) => {
      if (!path) {
        response.writeHead(404).end();

        return;
      }

      const extension = extname(path);

      const body = await readFile(path);

      const brotli =
        compressible.has(extension) && /\bbr\b/.test(request.headers['accept-encoding'] ?? '');

      response.setHeader('content-type', contentTypes.get(extension) ?? 'application/octet-stream');

      if (brotli) {
        response.setHeader('content-encoding', 'br');
      }

      response.writeHead(200).end(brotli ? brotliCompressSync(body) : body);
    });
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));

  const address = server.address();

  if (!(address instanceof Object)) {
    throw new Error('A TCP server listening on a port has an address object');
  }

  return {
    url: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}
