import { readFile } from './fileReader.js'
import { safeParse } from './parsers.js'
import buildDiff from './buildDiff.js'
import { getFormatter } from './formatters/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFile(filepath1)
  const file2 = readFile(filepath2)

  const obj1 = safeParse(file1.content, file1.extension, file1.filepath)
  const obj2 = safeParse(file2.content, file2.extension, file2.filepath)

  const diffTree = buildDiff(obj1, obj2)
  const formatFunction = getFormatter(format)

  return formatFunction(diffTree)
}

export default genDiff
