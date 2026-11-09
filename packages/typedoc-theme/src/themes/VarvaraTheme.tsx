import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  DefaultTheme,
  JSX,
  type PageEvent,
  type Reflection,
  type Renderer,
  RendererEvent,
} from 'typedoc'
import { VarvaraThemeContext } from './VarvaraThemeContext'

export class VarvaraTheme extends DefaultTheme {
  constructor(renderer: Renderer) {
    super(renderer)

    renderer.on(RendererEvent.END, (event) => {
      const varvaraCssPath = require.resolve('varvara-css/css')
      const assetsPath = path.resolve(event.outputDirectory, 'assets')

      fs.mkdirSync(assetsPath, { recursive: true })
      fs.copyFileSync(varvaraCssPath, path.join(assetsPath, 'varvara.css'))

      fs.cpSync(
        path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../assets/'),
        assetsPath,
        { recursive: true },
      )
    })

    renderer.hooks.on('head.end', (event) => (
      <>
        <link rel="stylesheet" href={event.relativeURL('assets/varvara.css')} />
        <link rel="stylesheet" href={event.relativeURL('assets/overrides.css')} />
      </>
    ))
  }

  getRenderContext(pageEvent: PageEvent<Reflection>) {
    return new VarvaraThemeContext(this.router, this, pageEvent, this.application.options)
  }
}
