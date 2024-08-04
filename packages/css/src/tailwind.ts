import plugin from 'tailwindcss/plugin'
import variables from '../dist/variables'
import components from '../dist/components'

const tailwindPlugin = plugin(function ({ addBase, addComponents }) {
  addBase(variables)
  addComponents(components)
})

export default tailwindPlugin
