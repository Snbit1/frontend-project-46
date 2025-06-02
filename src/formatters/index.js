import formatStylish from './formatStylish.js'
import formatPlain from './formatPlain.js'
import formatJson from './formatJson.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
}

export const getFormatter = (format) => {
  const formatFunction = formatters[format]
  if (!formatFunction) {
    throw new Error(`Unknown format: ${format}`)
  }
  return formatFunction
}

export default formatters
