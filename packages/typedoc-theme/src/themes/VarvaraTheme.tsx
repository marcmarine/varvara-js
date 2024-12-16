import {
  DefaultTheme,
  PageEvent,
  JSX,
  Reflection,
  Renderer,
  RendererEvent
} from 'typedoc'
import * as path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'
import { VarvaraThemeContext } from './VarvaraThemeContext'

export class VarvaraTheme extends DefaultTheme {
  constructor(renderer: Renderer) {
    super(renderer)

    renderer.on(RendererEvent.END, () => {
      const varvaraCssPath = require.resolve('varvara-css/css')
      const destPath = path.resolve(
        this.application.options.getValue('out'),
        'assets/varvara.css'
      )

      fs.mkdirSync(path.dirname(destPath), { recursive: true })
      fs.copyFileSync(varvaraCssPath, destPath)

      fs.cpSync(
        path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          '../assets/'
        ),
        path.resolve(this.application.options.getValue('out'), 'assets/'),
        { recursive: true }
      )
    })

    renderer.hooks.on('head.end', event => (
      <>
        <link rel="stylesheet" href={event.relativeURL('assets/varvara.css')} />
        <link
          rel="stylesheet"
          href={event.relativeURL('assets/overrides.css')}
        />
      </>
    ))
  }

  getRenderContext(pageEvent: PageEvent<Reflection>) {
    return new VarvaraThemeContext(this, pageEvent, this.application.options)
  }
}
