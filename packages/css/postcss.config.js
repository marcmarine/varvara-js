import atImport from 'postcss-import'
import postcssLightningcss from 'postcss-lightningcss'
import nested from 'postcss-nested'
import prefixer from 'postcss-prefixer'
import tailwindcss from 'tailwindcss'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    atImport,
    nested,
    tailwindcss,
    prefixer({
      prefix: 'va-',
    }),
    postcssLightningcss({
      lightningcssOptions: {
        browsers: '>= .25%',
      },
    }),
  ],
}

export default config
