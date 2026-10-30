import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export default function removePreviousCaptures() {
  rmSync(fileURLToPath(new URL('../../component-artifacts', import.meta.url)), {
    recursive: true,
    force: true,
  });
}
