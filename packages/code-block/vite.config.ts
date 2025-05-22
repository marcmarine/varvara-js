import type { UserConfig } from 'vite'

export default {
  build: {
    lib: {
      entry: 'index.ts',
      name: 'VaCodeBlock',
      fileName: 'index'
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
