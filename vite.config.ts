import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, lazyPlugins } from 'vite-plus';
import { fileURLToPath } from 'node:url';

const srcPath = (directory: string) =>
  fileURLToPath(new URL(`./src/${directory}`, import.meta.url));

export default defineConfig({
  fmt: {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    endOfLine: 'lf',
    insertFinalNewline: true,
    sortImports: false,
    sortTailwindcss: false,
    sortPackageJson: false,
    ignorePatterns: ['dist/**', 'node_modules/**'],
  },
  lint: {
    plugins: ['react', 'typescript', 'unicorn', 'oxc'],
    categories: {
      correctness: 'error',
    },
    env: {
      builtin: true,
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
    rules: {
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
  },
  plugins: lazyPlugins(() => [react(), tailwindcss()]),
  resolve: {
    alias: {
      assets: srcPath('assets'),
      components: srcPath('components'),
      contexts: srcPath('contexts'),
      data: srcPath('data'),
      localization: srcPath('localization'),
      pages: srcPath('pages'),
      utils: srcPath('utils'),
    },
  },
});
