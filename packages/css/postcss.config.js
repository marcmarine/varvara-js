import autoprefixer from 'autoprefixer'
import nested from 'postcss-nested'
import tailwindcss from 'tailwindcss'
import atImport from 'postcss-import'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [atImport, nested, tailwindcss, autoprefixer]
}

export default config
