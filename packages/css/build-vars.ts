// Temporary workaround: prejss generates variables with unsuitable naming conventions for our use case.
// Specifically, it outputs variables in the format "--va-font-size0" instead of the desired "--va-font-size-0".

import { readFileSync, writeFileSync } from 'fs'
import parse from 'style-to-js'

const cssFilePath = './dist/variables.css'

const cssContent = readFileSync(cssFilePath, 'utf8')

const lines = cssContent.split('\n')
const modifiedLines = lines.slice(1, -1)
const modifiedcssContent = modifiedLines.join('\n')

const jsContent = parse(modifiedcssContent)

const jsFilePath = './dist/variables.js'

writeFileSync(
  jsFilePath,
  `export default { ":root": ${JSON.stringify(jsContent)} }`
)

console.log(`Succeded!`)
