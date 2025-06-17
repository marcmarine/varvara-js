import { DefaultThemeRenderContext, JSX, PageEvent, Reflection, ReflectionFlag, type PageHeading, i18n, translateTagName, ReflectionFlags, type NavigationElement } from 'typedoc'
import type { VarvaraThemeContext } from '../themes/VarvaraThemeContext'
import { getDisplayName } from '../utils'

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

        visibilityOptions.push(buildFilterItem(context, filterName, translateTagName(key as `@${string}`), defaultFilters[key]))
      } else if (
        (key === 'protected' && !context.options.getValue('excludeProtected')) ||
        (key === 'private' && !context.options.getValue('excludePrivate')) ||
        (key === 'external' && !context.options.getValue('excludeExternals')) ||
        key === 'inherited'
      ) {
        visibilityOptions.push(buildFilterItem(context, key, ReflectionFlags.flagString(flagOptionNameToReflectionFlag[key]), defaultFilters[key]))
      }
    }

    return (
      <details class="va-collapse settings tsd-accordion" open={false}>
        <summary>{i18n.theme_settings()}</summary>
        {visibilityOptions.length && (
          <details class="va-collapse">
            <summary>{i18n.theme_member_visibility()}</summary>
            {...visibilityOptions}
          </details>
        )}
        <label>
          <span>{i18n.theme_theme()}</span>
          <select id="tsd-theme" class="va-select">
            <option value="os">{i18n.theme_os()}</option>
            <option value="light">{i18n.theme_light()}</option>
            <option value="dark">{i18n.theme_dark()}</option>
          </select>
        </label>
      </details>
    )
  }
}

function buildSectionNavigation(context: DefaultThemeRenderContext, headings: PageHeading[]) {
  const levels: JSX.Element[][] = [[]]
  const PADDING_PER_LEVEL = 12

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

    const icon = heading.kind && context.icons[heading.kind]()

    levels[levels.length - 1].push(
      <a href={heading.link} class={[heading.classes, 'va-button'].join(' ')} style={!icon ? `padding-left: ${PADDING_PER_LEVEL * (inferredLevel - 1)}px` : ''}>
        {icon}
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

function buildFilterItem(_context: DefaultThemeRenderContext, name: string, displayName: string, defaultValue: boolean) {
  return (
    <label class="tsd-filter-item">
      <span>{displayName}</span>
      <input class="tsd-filter-input va-checkbox" type="checkbox" id={`tsd-filter-${name}`} name={name} checked={defaultValue} />
    </label>
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
        <summary>{i18n.theme_on_this_page()}</summary>
        {sections}
      </details>
    )
  }
}

export const navigation =
  (context: VarvaraThemeContext) =>
  (props: PageEvent<Reflection>): JSX.Element => {
    const navigationData = context.getNavigation()

    return (
      <nav class="va-button-group">
        <Navigation data={navigationData} context={context} />
      </nav>
    )
  }

export const Navigation = ({ data, context }: { data: NavigationElement[]; context: DefaultThemeRenderContext }): JSX.Element => (
  <>
    {data.map(item =>
      item.children && item.children.length > 0 ? (
        <details class="va-collapse tsd-accordion">
          <summary class="tsd-accordion-summary" data-key={`section-${item.text}`}>
            {item.kind && context.icons[item.kind]()}
            {item.text}
          </summary>
          <Navigation data={item.children} context={context} />
        </details>
      ) : (
        <Item item={item} context={context} />
      )
    )}
  </>
)

const Item = ({ item, context }: { item: NavigationElement; context: DefaultThemeRenderContext }): JSX.Element => {
  const icon = item.kind && context.icons[item.kind]()

  return item.path ? (
    <a href={context.relativeURL(item.path)} class="va-button">
      {icon}
      <span>{item.text}</span>
    </a>
  ) : (
    <span class="va-button">
      {icon}
      <span>{item.text}</span>
    </span>
  )
}
