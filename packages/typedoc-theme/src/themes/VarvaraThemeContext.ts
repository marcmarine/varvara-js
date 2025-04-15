import { DefaultTheme, DefaultThemeRenderContext, Options, PageEvent, Reflection, type Router } from 'typedoc'
import { footer } from '../partials/footer'
import { sidebar } from '../partials/sidebar'
import { pageNavigation, pageSidebar, settings } from '../partials/navigation'
import { toolbar } from '../partials/toolbar'
import { layout } from '../partials/layout'

export class VarvaraThemeContext extends DefaultThemeRenderContext {
  public constructor(router: Router, theme: DefaultTheme, page: PageEvent<Reflection>, options: Options) {
    super(router, theme, page, options)

    this.pageSidebar = pageSidebar(this)
    this.toolbar = toolbar(this)
    this.defaultLayout = layout(this)
    this.sidebar = sidebar(this)
    this.settings = settings(this)
    this.pageNavigation = pageNavigation(this)
  }

  override footer = () => footer(this)
}
