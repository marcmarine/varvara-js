import type { UserConfig } from 'vite'

export default {
  build: {
    lib: {
      entry: 'index.ts',
      name: 'va-code-block'
    },
    rollupOptions: {
      external: ['prismjs'],
      output: {
        globals: {
          prismjs: 'Prism'
        }
      }
    }
  }
} satisfies UserConfig
