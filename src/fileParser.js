import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  const resolvedPath = path.resolve(filepath);
  const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
  const extname = path.extname(resolvedPath).toLowerCase();
  try {
    if (extname === '.json') {
      return JSON.parse(fileContent);
    }
    if (extname === '.yml' || extname === '.yaml') {
      return yaml.load(fileContent);
    }
    throw new Error(`Unsupported file format: ${extname}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error parsing file: ${resolvedPath}`);
    throw error;
  }
};
export default parseFile;
