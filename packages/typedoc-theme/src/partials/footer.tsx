import { i18n, JSX } from 'typedoc'
import type { VarvaraThemeContext } from '../themes/VarvaraThemeContext'

export function footer(context: VarvaraThemeContext) {
  const hideGenerator = context.options.getValue('hideGenerator')
  let generatorDisplay = <></>
  if (!hideGenerator) {
    const message = i18n.theme_generated_using_typedoc()

    // Only handles one occurrence, but that's all I expect...
    const index = message.indexOf('TypeDoc')
    if (index == -1) {
      generatorDisplay = <p class="tsd-generator">{message}</p>
    } else {
      const pre = message.substring(0, index)
      const post = message.substring(index + 'TypeDoc'.length)
      generatorDisplay = (
        <p class="tsd-generator">
          {pre}
          <a href="https://typedoc.org/" class="va-link" target="_blank">
            TypeDoc
          </a>
          {' & '}
          <a href="https://varvara.js.org/" class="va-link" target="_blank">
            Varvara CSS
          </a>
          {post}
        </p>
      )
    }
  }

  const customFooterHtml = context.options.getValue('customFooterHtml')
  let customFooterDisplay = <></>
  if (customFooterHtml) {
    if (context.options.getValue('customFooterHtmlDisableWrapper')) {
      customFooterDisplay = <JSX.Raw html={customFooterHtml} />
    } else {
      customFooterDisplay = (
        <p>
          <JSX.Raw html={customFooterHtml} />
        </p>
      )
    }
  }

  return (
    <footer>
      <div class="container">
        {context.hook('footer.begin', context)}
        {generatorDisplay}
        {customFooterDisplay}
        {context.hook('footer.end', context)}
      </div>
    </footer>
  )
}
