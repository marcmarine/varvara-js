import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import browserslist from 'browserslist'
import { browserslistToTargets, bundle, Features } from 'lightningcss'
import postcss from 'postcss'
import postcssJs from 'postcss-js'

const SRC = 'src'
const DIST = 'dist'
const targets = browserslistToTargets(browserslist('>= .25%'))

// Keep light-dark() as is: its polyfill relies on prefers-color-scheme
// and would ignore the color-scheme set by the consumer's page.
const exclude = Features.LightDark

// 1. CSS: one bundled file per source stylesheet
for (const filename of new Bun.Glob(`${SRC}/**/*.css`).scanSync()) {
  const { code } = bundle({ filename, minify: true, targets, exclude })
  const outfile = join(DIST, relative(SRC, filename))

  mkdirSync(dirname(outfile), { recursive: true })
  writeFileSync(outfile, code)

  console.log(`Generated: ${outfile}`)
}

// 2. CSS-in-JS objects for the Tailwind plugin (deprecated, removed in 1.0)
for (const name of ['variables', 'components']) {
  const root = postcss.parse(readFileSync(join(DIST, `${name}.css`), 'utf8'))
  const outfile = join(DIST, `${name}.js`)

  writeFileSync(outfile, `export default ${JSON.stringify(postcssJs.objectify(root))}\n`)

  console.log(`Generated: ${outfile}`)
}

// 3. Tailwind plugin entry point
const result = await Bun.build({
  entrypoints: [join(SRC, 'tailwind.ts')],
  outdir: DIST,
  external: ['*'],
})

if (!result.success) {
  for (const log of result.logs) console.error(log)
  process.exit(1)
}

console.log(`Generated: ${join(DIST, 'tailwind.js')}`)
