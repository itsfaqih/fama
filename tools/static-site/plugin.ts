import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  isRunnableDevEnvironment,
  runnerImport,
  type Plugin,
  type ResolvedConfig,
} from 'vite-plus';
import { languages, type Language } from '../../src/contexts/language.ts';

type Entry = typeof import('../../src/entry-server.tsx');

const entry = '/src/entry-server.tsx';

function fill(template: string, language: Language, app: string) {
  return template
    .replace('<html lang="en">', `<html lang="${language}">`)
    .replace('<!--app-->', app);
}

async function inlineAssets(outDir: string, html: string) {
  const stylesheet = /<link rel="stylesheet" crossorigin href="\/(assets\/[^"]+\.css)">/.exec(html);

  const script = /<script type="module" crossorigin src="\/(assets\/[^"]+\.js)"><\/script>/.exec(
    html,
  );

  if (!stylesheet?.[1] || !script?.[1]) {
    throw new Error('index.html should link one stylesheet and one module script');
  }

  const css = await readFile(join(outDir, stylesheet[1]), 'utf8');

  const js = await readFile(join(outDir, script[1]), 'utf8');

  await Promise.all([rm(join(outDir, stylesheet[1])), rm(join(outDir, script[1]))]);

  return html
    .replace(stylesheet[0], () => `<style>${css}</style>`)
    .replace(script[0], '')
    .replace('</body>', () => `${classicScriptAfterMarkup(js)}</body>`);
}

function classicScriptAfterMarkup(moduleCode: string) {
  return `<script>(()=>{${moduleCode}})()</script>`;
}

export function staticSite(): Plugin {
  let config: ResolvedConfig;

  return {
    name: 'static-site',
    config: () => ({ build: { modulePreload: { polyfill: false } } }),
    configResolved(resolved) {
      config = resolved;
    },
    configureServer(server) {
      const environment = server.environments.ssr;

      if (!isRunnableDevEnvironment(environment)) {
        throw new Error('The dev server should run its ssr environment in this process');
      }

      server.middlewares.use((request, response, next) => {
        const url = request.url ?? '/';

        const page = languages.find(
          ({ path }) => path === new URL(url, 'http://localhost').pathname,
        );

        if (!page) {
          next();

          return;
        }

        void (async () => {
          const template = await server.transformIndexHtml(
            url,
            await readFile(join(config.root, 'index.html'), 'utf8'),
          );

          const module = await environment.runner.import<Entry>(entry);

          response.setHeader('content-type', 'text/html; charset=utf-8');
          response.end(fill(template, page.value, module.render(page.value)));
        })().catch(next);
      });
    },
    hotUpdate({ modules }) {
      if (this.environment.name === 'ssr' && modules.length > 0) {
        this.environment.hot.send({ type: 'full-reload' });
      }
    },
    async closeBundle() {
      if (config.command !== 'build' || config.build.ssr) {
        return;
      }

      const outDir = join(config.root, config.build.outDir);

      const template = await inlineAssets(
        outDir,
        await readFile(join(outDir, 'index.html'), 'utf8'),
      );

      const { module } = await runnerImport<Entry>(entry, {
        root: config.root,
        resolve: { alias: config.resolve.alias },
        logLevel: 'error',
      });

      for (const { value, path } of languages) {
        const file = join(outDir, path, 'index.html');

        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, fill(template, value, module.render(value)));
      }
    },
  };
}
