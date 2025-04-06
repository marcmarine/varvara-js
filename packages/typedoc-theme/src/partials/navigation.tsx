import { DefaultThemeRenderContext, JSX, PageEvent, Reflection, ReflectionFlag, type PageHeading } from 'typedoc'
import type { VarvaraThemeContext } from '../themes/VarvaraThemeContext'

export function pageSidebar(context: VarvaraThemeContext) {
  return (props: PageEvent<Reflection>) => {
    return (
      <div class="va-button-group">
        {context.settings()}
        {context.pageNavigation(props)}
      </div>
    )
  }
}

const flagOptionNameToReflectionFlag = {
  protected: ReflectionFlag.Protected,
  private: ReflectionFlag.Private,
  external: ReflectionFlag.External,
  inherited: ReflectionFlag.Inherited
}

export function settings(context: DefaultThemeRenderContext) {
  return () => {
    const defaultFilters = context.options.getValue('visibilityFilters') as Record<string, boolean>

    const visibilityOptions: JSX.Element[] = []

    for (const key of Object.keys(defaultFilters)) {
      if (key.startsWith('@')) {
        const filterName = key
          .substring(1)
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase()

        visibilityOptions.push(buildFilterItem(context, filterName, context.internationalization.translateTagName(key as `@${string}`), defaultFilters[key]))
      } else if (
        (key === 'protected' && !context.options.getValue('excludeProtected')) ||
        (key === 'private' && !context.options.getValue('excludePrivate')) ||
        (key === 'external' && !context.options.getValue('excludeExternals')) ||
        key === 'inherited'
      ) {
        visibilityOptions.push(buildFilterItem(context, key, context.internationalization.flagString(flagOptionNameToReflectionFlag[key]), defaultFilters[key]))
      }
    }

    return (
      <details class="va-collapse settings tsd-accordion" open={false}>
        <summary>{context.i18n.theme_settings()}</summary>
        {visibilityOptions.length && (
          <div class="tsd-filter-visibility">
            <span class="settings-label">{context.i18n.theme_member_visibility()}</span>
            <ul id="tsd-filter-options">{...visibilityOptions}</ul>
          </div>
        )}
        <label>
          <span>{context.i18n.theme_theme()}</span>
          <select id="tsd-theme" class="va-select">
            <option value="os">{context.i18n.theme_os()}</option>
            <option value="light">{context.i18n.theme_light()}</option>
            <option value="dark">{context.i18n.theme_dark()}</option>
          </select>
        </label>
      </details>
    )
  }
}

function buildSectionNavigation(context: DefaultThemeRenderContext, headings: PageHeading[]) {
  const levels: JSX.Element[][] = [[]]
  const PADDING_PER_LEVEL = 18

  function finalizeLevel(finishedHandlingHeadings: boolean) {
    const level = levels.pop()!
    if (levels[levels.length - 1].length === 0 && finishedHandlingHeadings) {
      levels[levels.length - 1] = level
      return
    }

    const built = (
      <>
        {level.map(l => (
          <>{l}</>
        ))}
      </>
    )
    levels[levels.length - 1].push(built)
  }

  for (const heading of headings) {
    const inferredLevel = heading.level ? heading.level + 2 : heading.kind ? 2 : 1

    while (inferredLevel < levels.length) {
      finalizeLevel(false)
    }

    while (inferredLevel > levels.length) {
      levels.push([])
    }

    levels[levels.length - 1].push(
      <a href={heading.link} class={[heading.classes, 'va-button'].join(' ')} style={`padding-left: ${PADDING_PER_LEVEL * (inferredLevel - 1)}px`}>
        {heading.kind && context.icons[heading.kind]()}
        <span>{heading.text}</span>
      </a>
    )
  }

  while (levels.length > 1) {
    finalizeLevel(true)
  }

  levels.unshift([])
  finalizeLevel(true)
  return levels[0]
}

function buildFilterItem(context: DefaultThemeRenderContext, name: string, displayName: string, defaultValue: boolean) {
  return (
    <li class="tsd-filter-item">
      <label class="tsd-filter-input">
        <input type="checkbox" id={`tsd-filter-${name}`} name={name} checked={defaultValue} />
        {context.icons.checkbox()}
        <span>{displayName}</span>
      </label>
    </li>
  )
}

export function pageNavigation(context: VarvaraThemeContext) {
  return (props: PageEvent<Reflection>) => {
    if (!props.pageSections.some(sect => sect.headings.length)) {
      return <></>
    }

    const sections: JSX.Children = []

    for (const section of props.pageSections) {
      if (section.title) {
        sections.push(
          <details open class="va-collapse tsd-accordion">
            <summary data-key={`section-${section.title}`}>{section.title}</summary>
            {buildSectionNavigation(context, section.headings)}
          </details>
        )
      } else {
        sections.push(buildSectionNavigation(context, section.headings))
      }
    }

    return (
      <details open={false} class="va-collapse page-navigation tsd-accordion">
        <summary>{context.i18n.theme_on_this_page()}</summary>
        {sections}
      </details>
    )
  }
}
