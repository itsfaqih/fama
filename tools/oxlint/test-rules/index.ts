import { defineRule, eslintCompatPlugin } from 'vite-plus/lint/plugins';

const WAIT_CALLEES = new Set(['setTimeout', 'sleep', 'wait', 'waitForTimeout', 'delay']);

/** Tests wait on a condition (a retrying assertion), never on the clock. */
const noFixedWaitRule = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'Disallow fixed-duration waits in tests.' },
    messages: {
      fixedWait:
        'Replace the fixed wait with a retrying assertion (`await expect.element(...)` or `expect.poll`) on the state you are waiting for.',
    },
  },
  createOnce(context) {
    return {
      CallExpression(node) {
        const { callee } = node;

        const name =
          callee.type === 'Identifier'
            ? callee.name
            : callee.type === 'MemberExpression' && callee.property.type === 'Identifier'
              ? callee.property.name
              : undefined;

        if (name !== undefined && WAIT_CALLEES.has(name)) {
          context.report({ node, messageId: 'fixedWait' });
        }
      },
    };
  },
});

/** A forced click skips the actionability checks a real user is subject to. */
const noForceClickRule = defineRule({
  meta: {
    type: 'problem',
    docs: { description: 'Disallow `force: true` in user-event options.' },
    messages: {
      forceClick:
        'Remove `force: true`; make the element actionable (visible, enabled, uncovered) the way a user would.',
    },
  },
  createOnce(context) {
    return {
      Property(node) {
        if (
          node.key.type === 'Identifier' &&
          node.key.name === 'force' &&
          node.value.type === 'Literal' &&
          node.value.value === true
        ) {
          context.report({ node, messageId: 'forceClick' });
        }
      },
    };
  },
});

/** Test rules the generic Vitest plugin does not cover. */
const testRulesPlugin = eslintCompatPlugin({
  meta: { name: 'test-rules' },
  rules: {
    'no-fixed-wait': noFixedWaitRule,
    'no-force-click': noForceClickRule,
  },
});

export default testRulesPlugin;
