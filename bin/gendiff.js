#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .option('-f, --format <type>', 'output format', 'stylish');

program.exitOverride();

program.action((filepath1, filepath2, options) => {
  try {
    const diff = genDiff(filepath1, filepath2, options.format);
    // eslint-disable-next-line no-console
    console.log(diff);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading or parsing files:', error.message);
  }
});

try {
  program.parse(process.argv);
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error.message);
}
