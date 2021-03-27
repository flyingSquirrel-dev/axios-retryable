const prettierConfigStandard = require('prettier-config-standard')
const merge = require('lodash.merge')

module.exports = merge(prettierConfigStandard, {
  semi: false,
  trailingComma: 'all',
  tabWidth: 2,
  singleQuote: true,
  printWidth: 120,
})
