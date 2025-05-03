/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: ['./src/index.ts'],
  plugin: ['varvara-typedoc-theme'],
  theme: 'varvara-css',
  name: 'Varvara Theme Example',
  includeVersion: true,
  navigationLinks: {
    GitHub: 'https://github.com/marcmarine/varvara-js'
  }
}

export default config
