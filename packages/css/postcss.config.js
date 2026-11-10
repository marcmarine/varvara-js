import atImport from 'postcss-import'
import postcssLightningcss from 'postcss-lightningcss'
import nested from 'postcss-nested'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    atImport,
    nested,
    postcssLightningcss({
      lightningcssOptions: {
        browsers: '>= .25%',
      },
    }),
  ],
}

export default config
