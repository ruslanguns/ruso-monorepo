import { readFileSync } from 'fs';
import { join } from 'path';

const packageJson = readFileSync(join(__dirname, '../../package.json'), 'utf8');
const { version } = JSON.parse(packageJson);

export function echoTest(): string {
  return 'echo-test version= ' + version;
}
