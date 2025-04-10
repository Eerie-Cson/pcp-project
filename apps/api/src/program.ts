import { Logger } from '@nestjs/common';
import { program } from 'commander';

program
  .option('-m, --mode <mode>', 'accounts | components | auth | builds')
  .version('0.1.0');

program.exitOverride();

try {
  program.parse(global.argv || process.argv);
} catch (err) {
  Logger.warn(err);
}

export const options = program.opts<{
  mode: 'accounts' | 'components' | 'auth' | 'builds';
}>();
