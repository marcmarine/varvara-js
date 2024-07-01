import autoprefixer from 'autoprefixer'
import nested from 'postcss-nested'
import tailwindcss from 'tailwindcss'
import atImport from 'postcss-import'
import prefixer from 'postcss-prefixer'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    atImport,
    nested,
    tailwindcss,
    autoprefixer,
    prefixer({
      prefix: 'va-'
    })
  ]
}

export default config
