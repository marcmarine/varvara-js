import autoprefixer from 'autoprefixer'
import nested from 'postcss-nested'
import tailwindcss from 'tailwindcss'
import prefixer from 'postcss-prefixer'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    nested,
    tailwindcss,
    autoprefixer,
    prefixer({
      prefix: 'va-'
    })
  ]
}

export default config
