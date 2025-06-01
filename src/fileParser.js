import fs from 'fs'
import path from 'path'
import parse from './parsers.js'

const parseFile = (filepath) => {
  const resolvedPath = path.resolve(filepath)
  const fileContent = fs.readFileSync(resolvedPath, 'utf-8')
  const extname = path.extname(resolvedPath).toLowerCase()
  try {
    return parse(fileContent, extname)
  }
  catch (error) {
    console.error(`Error parsing file: ${resolvedPath}`)
    throw error
  }
}
export default parseFile
