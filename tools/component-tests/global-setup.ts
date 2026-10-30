import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Captures from an earlier run would sit beside this run's and mislead a reviewer.
export default function setup() {
  rmSync(fileURLToPath(new URL('../../component-artifacts', import.meta.url)), {
    recursive: true,
    force: true,
  });
}
