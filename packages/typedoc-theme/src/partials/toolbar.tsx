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
            {i18n.theme_search()}
          </button>
          <a href="#" class="va-button" id="tsd-toolbar-menu-trigger" data-toggle="menu" aria-label={i18n.theme_menu()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" width="16" height="16" stroke="currentColor">
              <path d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          </a>
        </div>
        <div class="navigation-links va-button-group">
          {Object.entries(context.options.getValue('navigationLinks')).map(([label, url]) => (
            <a href={url} class="va-button">
              <span>{label}</span>
              <i class="va-icon va-icon--external"></i>
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
