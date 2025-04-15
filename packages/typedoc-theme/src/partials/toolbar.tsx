import { i18n, DeclarationReflection, JSX, PageEvent, ProjectReflection, Reflection } from 'typedoc'
import type { VarvaraThemeContext } from '../themes/VarvaraThemeContext'

export function toolbar(context: VarvaraThemeContext) {
  return (props: PageEvent<Reflection>) => (
    <header class="page-toolbar">
      <div class="va-button-group">
        <div class="va-button-group va-button-group--horizontal">
          <a href={context.options.getValue('titleLink') || context.relativeURL('index.html')} class="title va-button">
            <b>{props.project.name}</b>
            {(props.project instanceof DeclarationReflection || props.project instanceof ProjectReflection) && props.project.packageVersion && <span class="version-badge">v{props.project.packageVersion}</span>}
          </a>
          <button id="tsd-search-trigger" class="va-button" aria-label={i18n.theme_search()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" width="16" height="16" stroke="currentColor">
              <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
        <div class="navigation-links va-button-group">
          {Object.entries(context.options.getValue('navigationLinks')).map(([label, url]) => (
            <a href={url} class="va-button">
              <span>{label}</span>
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.52346 0.380859H15.6187V14.4761H13.333V4.28282L2.33158 15.2842L0.715332 13.668L11.7167 2.66657H1.52346V0.380859Z" fill="currentColor"></path>
              </svg>
            </a>
          ))}
        </div>
      </div>
      <dialog id="tsd-search" aria-label={i18n.theme_search()}>
        <input
          role="combobox"
          class="va-input"
          id="tsd-search-input"
          aria-controls="tsd-search-results"
          aria-autocomplete="list"
          aria-expanded="true"
          spellcheck={false}
          autocapitalize="off"
          autocomplete="off"
          placeholder={i18n.theme_search_placeholder()}
          maxLength={100}
        />

        <ul role="listbox" id="tsd-search-results"></ul>
        <div id="tsd-search-status" aria-live="polite" aria-atomic="true">
          <div>{i18n.theme_preparing_search_index()}</div>
        </div>
      </dialog>
    </header>
  )
}
