import { type DefaultThemeRenderContext, JSX } from 'typedoc'

export function sidebarLinks(context: DefaultThemeRenderContext) {
  const links = Object.entries(context.options.getValue('sidebarLinks'))
  const navLinks = Object.entries(context.options.getValue('navigationLinks'))

  if (!links.length && !navLinks.length) {
    return null
  }

  return (
    <nav id="tsd-sidebar-links" class="tsd-navigation va-button-group">
      {links.map(([label, url]) => (
        <a href={url} class="va-button">
          <span>{label}</span>
          <i class="va-icon va-icon--external"></i>
        </a>
      ))}
      {navLinks.map(([label, url]) => (
        <a href={url} class="va-button">
          <span>{label}</span>
          <i class="va-icon va-icon--external"></i>
        </a>
      ))}
    </nav>
  )
}
