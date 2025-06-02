const indentSize = 4
const indentChar = ' '

const getIndent = (depth, type = 'normal') => {
  const baseIndent = indentChar.repeat(depth * indentSize - 2)
  if (type === 'added') return `${baseIndent}+ `
  if (type === 'removed') return `${baseIndent}- `
  return indentChar.repeat(depth * indentSize)
}

const stringify = (value, depth) => {
  if (value === null) return 'null'
  if (typeof value !== 'object') return String(value)

  const indent = indentChar.repeat(depth * indentSize)
  const bracketIndent = indentChar.repeat((depth - 1) * indentSize)

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`,
  )

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

const formatStylish = (diffTree, depth = 1) => {
  const nodeFormatters = {
    added: ({ key, value }) => `${getIndent(depth, 'added')}${key}: ${stringify(value, depth + 1)}`,
    removed: ({ key, value }) => `${getIndent(depth, 'removed')}${key}: ${stringify(value, depth + 1)}`,
    unchanged: ({ key, value }) => `${getIndent(depth)}${key}: ${stringify(value, depth + 1)}`,
    changed: ({ key, oldValue, newValue }) => [
      `${getIndent(depth, 'removed')}${key}: ${stringify(oldValue, depth + 1)}`,
      `${getIndent(depth, 'added')}${key}: ${stringify(newValue, depth + 1)}`,
    ],
    nested: ({ key, children }) => `${getIndent(depth)}${key}: {\n${formatStylish(children, depth + 1)}\n${indentChar.repeat(depth * indentSize)}}`,
  }

  const lines = diffTree.flatMap((node) => {
    const formatter = nodeFormatters[node.type]
    if (!formatter) {
      throw new Error(`Unknown node type: ${node.type}`)
    }
    return formatter(node)
  })

  if (depth === 1) {
    return ['{', ...lines, '}'].join('\n')
  }

  return lines.join('\n')
}

export default formatStylish
