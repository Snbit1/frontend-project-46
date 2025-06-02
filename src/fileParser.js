import fs from 'fs'
import path from 'path'
import { safeParse } from './parsers.js'

const parseFile = (filepath) => {
  const resolvedPath = path.resolve(filepath)
  const fileContent = fs.readFileSync(resolvedPath, 'utf-8')
  const extname = path.extname(resolvedPath).toLowerCase().slice(1)

  return safeParse(fileContent, extname, resolvedPath)
}
export default parseFile
