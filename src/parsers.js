import yaml from 'js-yaml'

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yml':
    case 'yaml':
      return yaml.load(data)
    default:
      throw new Error(`Unsupported file format: ${format}`)
  }
}

export const safeParse = (data, format, filepath = '') => {
  try {
    return parse(data, format)
  }
  catch (error) {
    if (filepath) {
      console.error(`Error parsing file: ${filepath}`)
    }
    throw error
  }
}

export default parse
