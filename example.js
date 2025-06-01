/* eslint-disable no-console */
import genDiff from './src/index.js'

const filepath1 = './__fixtures__/file1.json'
const filepath2 = './__fixtures__/file2.json'

console.log(genDiff(filepath1, filepath2))

console.log(genDiff(filepath1, filepath2, 'plain'))
