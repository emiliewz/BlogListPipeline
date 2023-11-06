module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  'extends': 'eslint:recommended',
  'ignorePatterns': ['dist', '.eslintrc.cjs'],
  'overrides': [],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  "plugins": [
    "jest", "cypress"
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'no-unused-vars': 0,
  }
}
