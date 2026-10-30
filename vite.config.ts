import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, lazyPlugins } from 'vite-plus';
import { playwright } from 'vite-plus/test/browser-playwright';
import { fileURLToPath } from 'node:url';
import { staticSite } from './tools/static-site/plugin.ts';

const srcPath = (directory: string) =>
  fileURLToPath(new URL(`./src/${directory}`, import.meta.url));

const componentArtifactsDir = fileURLToPath(new URL('./component-artifacts', import.meta.url));

const toolingIgnores = [
  '.agent/**',
  '.agents/**',
  '.claude/**',
  '.codex/**',
  '.continue/**',
  '.cursor/**',
  '.gemini/**',
  '.opencode/**',
  '.pi/**',
  '.roo/**',
  '.windsurf/**',
  'tools/oxlint/anti-slop/**',
];

const antiSlopRules = Object.fromEntries(
  [
    'no-array-filter-map',
    'no-reduce-accumulator-copy',
    'no-chained-type-assertions',
    'no-conditional-empty-object-spread',
    'no-known-value-widening',
    'no-module-mocking',
    'no-object-parameters',
    'no-reflect-apply',
    'no-reflect-get',
    'no-runtime-typeof',
    'no-shape-in-symbol-names',
    'no-unknown-parameters',
    'no-unknown-returns',
    'no-unknown-type-aliases',
    'no-unsafe-dictionary-type',
    'no-widen-then-assert',
    'require-readable-spacing',
    'require-safety-comment-for-type-assertion',
  ].map((rule) => [`anti-slop/${rule}`, 'error' as const]),
);

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
    ignorePatterns: ['dist/**', 'node_modules/**', ...toolingIgnores],
  },
  lint: {
    plugins: ['react', 'typescript', 'unicorn', 'oxc', 'vitest'],
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
    ignorePatterns: ['dist/**', ...toolingIgnores],
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
      { name: 'anti-slop', specifier: './tools/oxlint/anti-slop/index.ts' },
      { name: 'test-rules', specifier: './tools/oxlint/test-rules/index.ts' },
    ],
    rules: {
      'vite-plus/prefer-vite-plus-imports': 'error',
      'typescript/no-explicit-any': 'error',
      'typescript/no-unsafe-assignment': 'error',
      'typescript/no-unsafe-member-access': 'error',
      'typescript/no-unsafe-call': 'error',
      'typescript/no-unsafe-return': 'error',
      'typescript/no-unsafe-argument': 'error',
      'typescript/no-unsafe-type-assertion': 'error',
      'typescript/switch-exhaustiveness-check': 'error',
      'typescript/no-floating-promises': 'error',
      'oxc/no-accumulating-spread': 'error',
      ...antiSlopRules,
    },
    overrides: [
      {
        files: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'tools/static-site/**/*.test.ts'],
        rules: {
          'vitest/expect-expect': 'error',
          'vitest/no-conditional-expect': 'error',
          'vitest/no-standalone-expect': 'error',
          'vitest/no-identical-title': 'error',
          'vitest/valid-expect': 'error',
          'vitest/no-focused-tests': 'error',
          'test-rules/no-fixed-wait': 'error',
          'test-rules/no-force-click': 'error',
        },
      },
    ],
  },
  // lazyPlugins returns undefined while vp only reads config metadata (lint, fmt).
  plugins: lazyPlugins(() => [react(), tailwindcss(), staticSite()]) ?? [],
  test: {
    retry: 0,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/**/*.browser.test.tsx'],
          environment: 'node',
          sequence: { shuffle: true },
        },
      },
      {
        extends: true,
        test: {
          name: 'site',
          include: ['tools/static-site/**/*.test.ts'],
          environment: 'node',
          testTimeout: 20000,
        },
      },
      {
        extends: true,
        define: {
          COMPONENT_ARTIFACTS_DIR: JSON.stringify(componentArtifactsDir),
        },
        test: {
          name: 'components',
          expect: { poll: { timeout: 3000 } },
          include: ['src/**/*.browser.test.tsx'],
          globalSetup: ['./tools/component-tests/global-setup.ts'],
          setupFiles: ['./tools/component-tests/setup.ts'],
          browser: {
            enabled: true,
            provider: playwright({ actionTimeout: 5000 }),
            headless: true,
            viewport: { width: 1280, height: 720 },
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      assets: srcPath('assets'),
      components: srcPath('components'),
      'component-tests': fileURLToPath(new URL('./tools/component-tests', import.meta.url)),
      contexts: srcPath('contexts'),
      data: srcPath('data'),
      localization: srcPath('localization'),
      pages: srcPath('pages'),
      utils: srcPath('utils'),
    },
  },
});
