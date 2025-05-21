import _ from 'lodash';
import parseFile from './fileParser.js';

const stringify = (value) => {
  if (typeof value === 'boolean' || typeof value === 'number') {
    return value;
  }
  return String(value);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);
  const sortedKeys = allKeys.sort();
  const lines = sortedKeys.flatMap((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!(key in obj2)) {
      return `  - ${key}: ${stringify(val1)}`;
    }
    if (!(key in obj1)) {
      return `  + ${key}: ${stringify(val2)}`;
    }
    if (val1 === val2) {
      return `    ${key}: ${stringify(val1)}`;
    }
    return [
      `  - ${key}: ${stringify(val1)}`,
      `  + ${key}: ${stringify(val2)}`,
    ];
  });
  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
