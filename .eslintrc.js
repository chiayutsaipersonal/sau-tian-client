// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'standard',
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],
    'generator-star-spacing': 'off', // allow async-await
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow debugger during development
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    "vue/max-attributes-per-line": ['error', {
      "singleline": 1,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }]
  }
}
