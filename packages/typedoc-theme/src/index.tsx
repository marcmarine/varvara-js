import type { Application } from 'typedoc'
import { VarvaraTheme } from './themes/VarvaraTheme'

export function load(app: Application) {
  app.renderer.defineTheme('varvara', VarvaraTheme)
}
