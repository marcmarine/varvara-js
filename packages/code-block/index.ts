import buttonCss from 'varvara-css/button?inline'
import cardCss from 'varvara-css/card?inline'
import variablesCss from 'varvara-css/variables?inline'
import { highlight } from './highlight'
import tokensCss from './tokens.css?inline'

const scopeToHost = (css: string): string => css.replace(/:root/g, ':host')

const codeBlockStylesheet = (() => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(
    `${scopeToHost(variablesCss)}${scopeToHost(cardCss)}${scopeToHost(buttonCss)}${tokensCss}`,
  )
  sheet.insertRule('.va-button--action { text-align: right !important; }')
  sheet.insertRule('pre { margin: 0 !important; border-radius: 0 !important; }')
  sheet.insertRule('code { white-space: pre-wrap !important; }')
  return sheet
})()

class CodeBlock extends HTMLElement {
  private shadow: ShadowRoot
  private codeElement!: HTMLElement
  private languageButton!: HTMLButtonElement
  private copyButton!: HTMLButtonElement
  private copyTimeoutId: ReturnType<typeof setTimeout> | null = null
  private initialized = false

  private static readonly DEFAULT_LANGUAGE = 'text'
  private static readonly COPY_BUTTON_TEXT = 'Copy'
  private static readonly COPIED_BUTTON_TEXT = 'Copied'

  static get observedAttributes() {
    return ['text', 'language', 'lang']
  }

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.adoptedStyleSheets = [codeBlockStylesheet]
  }

  connectedCallback() {
    if (!this.initialized) {
      this.render()
      this.initialized = true
    }

    this.update()
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue || !this.initialized) return
    this.update()
  }

  private render() {
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'va-card')
    wrapper.setAttribute('part', 'card')

    const pre = document.createElement('pre')
    pre.setAttribute('class', 'va-card__body')
    pre.setAttribute('tabindex', '-1')
    pre.setAttribute('part', 'pre-content')

    this.codeElement = document.createElement('code')
    pre.appendChild(this.codeElement)
    wrapper.appendChild(pre)

    const actions = document.createElement('div')
    actions.setAttribute('class', 'va-card__actions')

    this.languageButton = document.createElement('button')
    this.languageButton.setAttribute('class', 'va-button')
    this.languageButton.setAttribute('tabindex', '-1')
    actions.appendChild(this.languageButton)

    this.copyButton = document.createElement('button')
    this.copyButton.setAttribute('class', 'va-button va-button--action')
    this.copyButton.textContent = CodeBlock.COPY_BUTTON_TEXT
    actions.appendChild(this.copyButton)

    wrapper.appendChild(actions)
    this.shadow.appendChild(wrapper)
  }

  private update() {
    const codeContent = this.getAttribute('text')?.trim() || ''
    const language = this.getLanguage()

    this.codeElement.innerHTML = highlight(codeContent, language)

    this.codeElement.className = `language-${language}`
    this.languageButton.textContent = language.toUpperCase()
    this.copyButton.onclick = () => this.handleCopyClick(this.copyButton, codeContent)
  }

  private handleCopyClick(button: HTMLButtonElement, content: string): void {
    navigator.clipboard.writeText(content)
    button.textContent = CodeBlock.COPIED_BUTTON_TEXT

    if (this.copyTimeoutId !== null) clearTimeout(this.copyTimeoutId)
    this.copyTimeoutId = setTimeout(() => {
      button.textContent = CodeBlock.COPY_BUTTON_TEXT
      this.copyTimeoutId = null
    }, 2000)
  }

  private getLanguage(): string {
    return this.getAttribute('language') || this.getAttribute('lang') || CodeBlock.DEFAULT_LANGUAGE
  }
}

if (!customElements.get('va-code-block')) {
  customElements.define('va-code-block', CodeBlock)
}

export { CodeBlock as VaCodeBlock }
