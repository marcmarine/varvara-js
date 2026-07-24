import type { UserConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default {
  build: {
    lib: {
      entry: 'index.ts',
      name: 'VaCodeBlock',
      fileName: 'index',
    },
  },
  plugins: [dts()],
} satisfies UserConfig
