import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, lazyPlugins } from 'vite-plus';
import { fileURLToPath } from 'node:url';

const srcPath = (directory: string) =>
  fileURLToPath(new URL(`./src/${directory}`, import.meta.url));

// Project-local agent tooling and vendored lint plugins are not application source.
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
        files: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
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
  plugins: lazyPlugins(() => [react(), tailwindcss()]) ?? [],
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
