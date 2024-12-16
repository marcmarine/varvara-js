import {
  DeclarationReflection,
  JSX,
  PageEvent,
  ProjectReflection,
  Reflection
} from 'typedoc'
import type { VarvaraThemeContext } from '../themes/VarvaraThemeContext'
import { getDisplayName } from '../utils'

export function toolbar(context: VarvaraThemeContext) {
  return (props: PageEvent<Reflection>) => (
    <header class="page-toolbar">
      <div class="search" id="tsd-search">
        <div class="field va-button-group">
          <div class="va-button-group va-button-group--horizontal">
            <a
              href={
                context.options.getValue('titleLink') ||
                context.relativeURL('index.html')
              }
              class="va-button"
            >
              <b>{props.project.name}</b>
              {(props.project instanceof DeclarationReflection ||
                props.project instanceof ProjectReflection) &&
                props.project.packageVersion && (
                  <span class="version-badge">
                    v{props.project.packageVersion}
                  </span>
                )}
            </a>
            <label for="tsd-search-field" class="va-button">
              {context.icons.search()}
            </label>

            <a
              href="#"
              class="va-button"
              data-toggle="menu"
              aria-label={context.i18n.theme_menu()}
            >
              {context.icons.menu()}
            </a>
          </div>

          <input
            type="text"
            id="tsd-search-field"
            class="va-input"
            placeholder={context.i18n.theme_search()}
            aria-label={context.i18n.theme_search()}
          />
        </div>

        <ul class="results">
          <li class="state loading">
            {context.i18n.theme_preparing_search_index()}
          </li>
          <li class="state failure">
            {context.i18n.theme_search_index_not_available()}
          </li>
        </ul>
      </div>
      <div class="navigation-links va-button-group">
        {Object.entries(context.options.getValue('navigationLinks')).map(
          ([label, url]) => (
            <a href={url} class="va-button">
              <span>{label}</span>
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.52346 0.380859H15.6187V14.4761H13.333V4.28282L2.33158 15.2842L0.715332 13.668L11.7167 2.66657H1.52346V0.380859Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          )
        )}
      </div>
    </header>
  )
}
