module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    jest: true
  },
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
