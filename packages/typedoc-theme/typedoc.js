/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: ['./example/src'],
  plugin: ['./dist/index.js'],
  theme: 'varvara',
  name: 'Varvara Theme Example',
  includeVersion: true,
  navigationLinks: {
    GitHub: 'https://github.com/marcmarine/varvara-js'
  }
}

export default config
