import path from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __dirname = path.resolve();

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff compares flat JSON files correctly', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const result = genDiff(filepath1, filepath2);
  expect(result).toBe(expected);
});
