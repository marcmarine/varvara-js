import { JSX, PageEvent, Reflection } from 'typedoc'
import type { VarvaraThemeContext } from '../themes/VarvaraThemeContext'

export function sidebar(context: VarvaraThemeContext) {
  const navigation = context.getNavigation()

  return (props: PageEvent<Reflection>) => {
    return (
      <nav class="va-button-group">
        <details class="va-collapse tsd-accordion">
          <summary>
            <a href={context.urlTo(props.project)}>
              {context.i18n.kind_plural_module()}
            </a>
          </summary>
          {navigation.map(item => (
            <a
              href={`${context.relativeURL('./')}/${item.path}`}
              class={[
                'va-button',
                item.path?.includes(props.url) && 'va-button--active'
              ].join(' ')}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                class="tsd-kind-icon"
              >
                <use href={`#icon-${item.kind}`}></use>
              </svg>
              {item.text}
            </a>
          ))}
        </details>
      </nav>
    )
  }
}
