import autoprefixer from 'autoprefixer'
import nested from 'postcss-nested'
import tailwindcss from 'tailwindcss'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [nested, tailwindcss, autoprefixer]
}

export default config
