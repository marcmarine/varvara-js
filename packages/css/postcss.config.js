import atImport from 'postcss-import'
import postcssLightningcss from 'postcss-lightningcss'
import nested from 'postcss-nested'
import tailwindcss from 'tailwindcss'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    atImport,
    nested,
    tailwindcss,
    postcssLightningcss({
      lightningcssOptions: {
        browsers: '>= .25%',
      },
    }),
  ],
}

export default config
