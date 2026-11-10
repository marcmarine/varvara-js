import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import browserslist from 'browserslist'
import { browserslistToTargets, bundle, Features } from 'lightningcss'

const SRC = 'src'
const DIST = 'dist'
const targets = browserslistToTargets(browserslist('>= .25%'))

// Keep light-dark() as is: its polyfill relies on prefers-color-scheme
// and would ignore the color-scheme set by the consumer's page.
const exclude = Features.LightDark

const files = new Bun.Glob(`${SRC}/**/*.css`).scanSync()

for (const filename of files) {
  const { code } = bundle({ filename, minify: true, targets, exclude })
  const outfile = join(DIST, relative(SRC, filename))

  mkdirSync(dirname(outfile), { recursive: true })
  writeFileSync(outfile, code)

  console.log(`Generated: ${outfile}`)
}
