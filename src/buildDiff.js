const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)

const buildDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const allKeys = [
    ...keys1,
    ...keys2.filter(key => !keys1.includes(key))].sort((a, b) => a.localeCompare(b))

  return allKeys.map((key) => {
    const val1 = obj1[key]
    const val2 = obj2[key]

    if (isObject(val1) && isObject(val2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(val1, val2),
      }
    }

    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: val1 }
    }

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: val2 }
    }

    if (val1 === val2) {
      return { key, type: 'unchanged', value: val1 }
    }

    return {
      key,
      type: 'changed',
      oldValue: val1,
      newValue: val2,
    }
  })
}

export default buildDiff
