import fs from 'fs'
import path from 'path'

export const getAbsolutePath = filepath => path.resolve(filepath)

export const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const extension = path.extname(absolutePath).toLowerCase().slice(1)

  return { content, extension, filepath: absolutePath }
}
