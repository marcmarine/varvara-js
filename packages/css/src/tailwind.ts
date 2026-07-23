import plugin from 'tailwindcss/plugin'
import components from '../dist/components'
import variables from '../dist/variables'

const tailwindPlugin = plugin(({ addBase, addComponents }) => {
  addBase(variables)
  addComponents(components)
})

export default tailwindPlugin
