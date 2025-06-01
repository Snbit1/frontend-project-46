import formatStylish from './formatStylish.js';
import formatPlain from './formatPlain.js';
import formatJson from './formatJson.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

export default formatters;
