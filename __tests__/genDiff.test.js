import path from 'path'
import { expect, test } from '@jest/globals'
import fs from 'fs'
import genDiff from '../src/index.js'

const __dirname = path.resolve()
const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('gendiff compares nested JSON files correctly (stylish)', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = readFile('expected_stylish.txt')

  const result = genDiff(filepath1, filepath2)
  expect(result).toBe(expected)
})

test('gendiff compares nested JSON files correctly (plain)', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = readFile('expected_plain.txt')

  const result = genDiff(filepath1, filepath2, 'plain')

  const normalize = str => str.split('\r\n').join('\n').trim()

  expect(normalize(result)).toBe(normalize(expected))
})

test('gendiff compares nested JSON files correctly (json)', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = readFile('expected_json.txt').trim()

  const result = genDiff(filepath1, filepath2, 'json').trim()

  expect(result).toBe(expected)
})
