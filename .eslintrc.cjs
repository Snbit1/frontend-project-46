module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'brace-style': 'off',
    'semi': 'off',
    '@typescript-eslint/semi': 'off',

    'import/extensions': 'off',

    'no-console': 'off',

    'arrow-parens': 'off',

    'no-underscore-dangle': 'off',

    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
  },
  ignorePatterns: ['dist/'],
  env: {
    node: true,
  },
}
