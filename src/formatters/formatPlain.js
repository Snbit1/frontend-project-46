const isComplexValue = value => value !== null && typeof value === 'object'

const stringifyValue = (value) => {
  if (isComplexValue(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  if (value === null) return 'null'
  return String(value)
}

const formatPlain = (diffTree, path = []) => {
  const lines = diffTree.flatMap((node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node

    const propertyPath = [...path, key].join('.')

    switch (type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${stringifyValue(value)}`
      case 'removed':
        return `Property '${propertyPath}' was removed`
      case 'changed':
        return `Property '${propertyPath}' was updated. From ${stringifyValue(oldValue)} to ${stringifyValue(newValue)}`
      case 'nested':
        return formatPlain(children, [...path, key])
      case 'unchanged':
        return []
      default:
        throw new Error(`Unknown node type: ${type}`)
    }
  })

  return lines.join('\n')
}

export default formatPlain
