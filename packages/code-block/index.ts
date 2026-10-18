import buttonCss from 'varvara-css/button?inline'
import cardCss from 'varvara-css/card?inline'
import selectCss from 'varvara-css/select?inline'
import variablesCss from 'varvara-css/variables?inline'
import { highlight } from './highlight'
import tokensCss from './tokens.css?inline'

const scopeToHost = (css: string): string => css.replace(/:root/g, ':host')

const codeBlockStylesheet = (() => {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(
    `${scopeToHost(variablesCss)}${scopeToHost(cardCss)}${scopeToHost(buttonCss)}${selectCss}${tokensCss}`,
  )
  sheet.insertRule('.va-button--action { text-align: right !important; }')
  sheet.insertRule('.va-select { font-family: var(--va-font-family-headings); font-weight: 500; }')
  sheet.insertRule('[hidden] { display: none !important; }')
  sheet.insertRule('pre { margin: 0 !important; border-radius: 0 !important; }')
  sheet.insertRule('code { white-space: pre-wrap !important; }')
  return sheet
})()

interface Block {
  code: string
  language: string
  label: string
  // Value matched against the `selected` attribute
  value: string
}

class CodeBlock extends HTMLElement {
  private shadow: ShadowRoot
  private codeElement!: HTMLElement
  private languageButton!: HTMLButtonElement
  private languageSelect!: HTMLSelectElement
  private copyButton!: HTMLButtonElement
  private copyTimeoutId: ReturnType<typeof setTimeout> | null = null
  private initialized = false
  private blocks: Block[] = []
  private observer = new MutationObserver(() => this.update())

  private static readonly DEFAULT_LANGUAGE = 'text'
  private static readonly COPY_BUTTON_TEXT = 'Copy'
  private static readonly COPIED_BUTTON_TEXT = 'Copied'

  static get observedAttributes() {
    return ['text', 'language', 'lang', 'selected']
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
    // Light DOM content may still be parsing or change later
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class', 'data-label'],
    })
  }

  disconnectedCallback() {
    this.observer.disconnect()
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

    this.languageSelect = document.createElement('select')
    this.languageSelect.setAttribute('class', 'va-select')
    this.languageSelect.setAttribute('aria-label', 'Language')
    this.languageSelect.setAttribute('part', 'select')
    this.languageSelect.hidden = true
    this.languageSelect.addEventListener('change', () => this.handleSelectChange())
    actions.appendChild(this.languageSelect)

    this.copyButton = document.createElement('button')
    this.copyButton.setAttribute('class', 'va-button va-button--action')
    this.copyButton.textContent = CodeBlock.COPY_BUTTON_TEXT
    actions.appendChild(this.copyButton)

    wrapper.appendChild(actions)
    this.shadow.appendChild(wrapper)
  }

  private update() {
    const blocks = this.getBlocks()
    const isMultiple = blocks.length > 1

    // Only rebuild the options when the blocks change, not on every mutation
    if (
      blocks.map((block) => block.label).join('\n') !==
      this.blocks.map((block) => block.label).join('\n')
    ) {
      this.languageSelect.replaceChildren(
        ...blocks.map((block, index) => new Option(block.label, String(index))),
      )
    }
    this.blocks = blocks

    const index = this.getSelectedIndex()
    const block = blocks[index]
    if (!block) return
    const { code, language, label } = block

    this.codeElement.innerHTML = highlight(code, language)
    this.codeElement.className = `language-${language}`

    this.languageButton.hidden = isMultiple
    this.languageButton.textContent = label
    this.languageSelect.hidden = !isMultiple
    this.languageSelect.value = String(index)

    this.copyButton.onclick = () => this.handleCopyClick(this.copyButton, code)
  }

  private handleSelectChange(): void {
    const block = this.blocks[Number(this.languageSelect.value)]
    if (!block) return

    // Reflecting the attribute triggers `update()`
    this.setAttribute('selected', block.value)
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        detail: { label: block.label, language: block.language, value: block.value },
      }),
    )
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

  // The `text` attribute takes precedence over light DOM content
  // (e.g. one or more `<pre><code>` fallbacks readable without JavaScript)
  private getBlocks(): Block[] {
    const text = this.getAttribute('text')
    const pres = this.querySelectorAll<HTMLPreElement>(':scope > pre')

    if (text !== null || pres.length === 0) {
      const code = text === null ? this.querySelector('code') : null
      return [this.createBlock((text ?? this.textContent ?? '').trim(), code)]
    }

    return Array.from(pres, (pre) => {
      const code = pre.querySelector('code')
      return this.createBlock((pre.textContent ?? '').trim(), code, pre.dataset.label)
    })
  }

  private createBlock(code: string, codeElement: HTMLElement | null, label?: string): Block {
    const language =
      codeElement?.className.match(/(?:^|\s)language-(\S+)/)?.[1] ||
      this.getAttribute('language') ||
      this.getAttribute('lang') ||
      CodeBlock.DEFAULT_LANGUAGE

    return {
      code,
      language,
      label: label || language.toUpperCase(),
      value: label || language,
    }
  }

  // `selected` matches a block's `data-label` or language; defaults to the first block
  private getSelectedIndex(): number {
    const selected = this.getAttribute('selected')?.toLowerCase()
    if (!selected) return 0

    const index = this.blocks.findIndex(
      (block) =>
        block.value.toLowerCase() === selected || block.language.toLowerCase() === selected,
    )
    return Math.max(index, 0)
  }
}

if (!customElements.get('va-code-block')) {
  customElements.define('va-code-block', CodeBlock)
}

export { CodeBlock as VaCodeBlock }
