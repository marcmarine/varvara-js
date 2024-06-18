const plugin = require('tailwindcss/plugin')
const variables = require('../dist/variables')
const components = require('../dist/components')

const tailwindPlugin = plugin(function ({ addBase, addComponents }) {
  addBase(variables)
  addComponents(components)
})

module.exports = tailwindPlugin
