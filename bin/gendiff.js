#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .option('-f, --format <type>', 'output format', 'stylish');

program.helpInformation = () => `
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format
  -h, --help           display help for command
`;

program.action((filepath1, filepath2, options) => {
  try {
    const diff = genDiff(filepath1, filepath2, options.format);
    // eslint-disable-next-line no-console
    console.log(diff);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading or parsing files:', error);
    process.exit(1);
  }
});

program.parse(process.argv);
