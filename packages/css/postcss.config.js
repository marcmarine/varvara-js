import nested from 'postcss-nested'
import tailwindcss from 'tailwindcss'
import atImport from 'postcss-import'
import prefixer from 'postcss-prefixer'
import postcssLightningcss from 'postcss-lightningcss'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    atImport,
    nested,
    tailwindcss,
    prefixer({
      prefix: 'va-'
    }),
    postcssLightningcss({
      lightningcssOptions: {
        browsers: '>= .25%'
      }
    })
  ]
}

export default config
