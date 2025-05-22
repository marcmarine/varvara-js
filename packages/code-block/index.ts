import Prism from 'prismjs'
import variablesCss from 'varvara-css/variables?inline'
import cardCss from 'varvara-css/card?inline'
import buttonCss from 'varvara-css/button?inline'

class CodeBlock extends HTMLElement {
  private shadow: ShadowRoot
  private static readonly DEFAULT_LANGUAGE = 'js'
  private static readonly DEFAULT_THEME = 'one-dark'
  private static readonly COPY_BUTTON_TEXT = 'Copy'
  private static readonly COPIED_BUTTON_TEXT = 'Copied'

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    const code = this.getAttribute('text')?.trim() || ''
    this.removeAttribute('text')

    this.setupStyles()
    this.render(code)
  }

  private setupStyles() {
    const sheet = new CSSStyleSheet()
    const scopeToHost = (css: string): string => css.replace(/:root/g, ':host')

    const scopedVariablesCss = scopeToHost(variablesCss)
    const scopedCardCss = scopeToHost(cardCss)
    const scopedButtonCss = scopeToHost(buttonCss)

    sheet.replaceSync(`${scopedVariablesCss}${scopedCardCss}${scopedButtonCss}`)
    sheet.insertRule('.va-button--action { text-align: right !important; }')
    sheet.insertRule('pre { margin: 0 !important; border-radius: 0 !important; }')
    sheet.insertRule('code { white-space: pre-wrap !important; }')
    this.shadow.adoptedStyleSheets = [sheet]

    const theme = this.getAttribute('theme') || CodeBlock.DEFAULT_THEME
    const themeLink = document.createElement('link')
    themeLink.rel = 'stylesheet'
    themeLink.href = `https://unpkg.com/prism-themes@latest/themes/prism-${theme}.css`
    this.shadow.appendChild(themeLink)
  }

  private render(codeContent: string) {
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'va-card')
    wrapper.setAttribute('part', 'card')

    const pre = document.createElement('pre')
    pre.setAttribute('class', 'va-card__body')
    pre.setAttribute('tabindex', '-1')

    const codeElement = document.createElement('code')
    const language = this.getLanguage()
    codeElement.setAttribute('class', `language-${language}`)
    codeElement.textContent = codeContent

    pre.appendChild(codeElement)

    Prism.highlightElement(codeElement)

    wrapper.appendChild(pre)

    const actions = document.createElement('div')
    actions.setAttribute('class', 'va-card__actions')

    const languageButton = document.createElement('button')
    languageButton.setAttribute('class', 'va-button')
    languageButton.setAttribute('tabindex', '-1')

    languageButton.textContent = language

    actions.appendChild(languageButton)

    const copyButton = document.createElement('button')
    copyButton.setAttribute('class', 'va-button va-button--action')
    copyButton.textContent = 'Copy'
    copyButton.addEventListener('click', () => this.handleCopyClick(copyButton, codeContent))

    actions.appendChild(copyButton)

    wrapper.appendChild(actions)

    this.shadow.appendChild(wrapper)
  }

  private handleCopyClick(button: HTMLButtonElement, content: string): void {
    navigator.clipboard.writeText(content)
    button.textContent = CodeBlock.COPIED_BUTTON_TEXT

    setTimeout(() => {
      button.textContent = CodeBlock.COPY_BUTTON_TEXT
    }, 2000)
  }

  private getLanguage(): string {
    return this.getAttribute('language') || this.getAttribute('lang') || CodeBlock.DEFAULT_LANGUAGE
  }
}

customElements.define('va-code-block', CodeBlock)
