import type { UserConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
  },
  plugins: [dts()]
} satisfies UserConfig
