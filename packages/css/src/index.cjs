const plugin = require('tailwindcss/plugin')
const base = require('../dist/base')
const components = require('../dist/components')

const tailwindPlugin = plugin(function ({ addBase, addComponents }) {
  addBase(base)
  addComponents(components)
})

module.exports = tailwindPlugin
