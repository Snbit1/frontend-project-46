import path from 'path'
import { expect, test, describe } from '@jest/globals'
import fs from 'fs'
import genDiff from '../src/index.js'

const __dirname = path.resolve()
const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

const filepath1 = getFixturePath('file1.json')
const filepath2 = getFixturePath('file2.json')

const normalize = str => str.split('\r\n').join('\n').trim()

describe('gendiff output formats', () => {
  test.each([
    ['stylish', 'expected_stylish.txt'],
    ['plain', 'expected_plain.txt'],
    ['json', 'expected_json.txt'],
  ])('gendiff with %s formatter', (format, expectedFile) => {
    const expected = readFile(expectedFile)
    const result = genDiff(filepath1, filepath2, format)

    expect(normalize(result)).toBe(normalize(expected))
  })
})
