await Bun.build({
  entrypoints: ['./src/index.tsx'],
  outdir: './dist',
  target: 'node',
  packages: 'external'
})
