# Varvara 🤦‍♀️ Code Block

A Custom HTML Element that renders code blocks with a copy button. See the [full documentation](https://varvara.js.org/code-block) for usage details and a live demo.

[![NPM Version](https://img.shields.io/npm/v/va-code-block?color=cyan)](https://www.npmjs.com/package/va-code-block)
[![GitHub License](https://img.shields.io/github/license/marcmarine/varvara-js)](https://github.com/marcmarine/varvara-js/blob/main/LICENSE)
[![TypeDoc](https://img.shields.io/badge/view-CHANGELOG.md-blue.svg)](https://github.com/marcmarine/varvara-js/blob/main/packages/code-block/CHANGELOG.md)
![Bundle Size](https://img.shields.io/npm/unpacked-size/va-code-block?color=white)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/va-code-block)

> [!IMPORTANT]
> This component is in an early development stage. The API is not yet stable and may change in future releases.

## Installation

### Using a CDN

Add the script to your page and the `<va-code-block>` element is ready to use:

```html
<script src="https://unpkg.com/va-code-block"></script>
```

### Using NPM

```bash
npm i va-code-block
```

Then import the package once in your JavaScript. Importing it registers the element:

```js
import 'va-code-block'
```

Styles are bundled inside the component, so you don't need to include Varvara CSS to use it.

## Usage

### With a code fallback

Place the code inside the element as a regular `<pre><code>` block, with the language as a `language-*` class. It stays readable for crawlers, AI agents and browsers without JavaScript, and is replaced by the highlighted version once the component loads:

```html
<va-code-block>
  <pre><code class="language-html">&lt;button class="va-button"&gt;Example button&lt;/button&gt;</code></pre>
</va-code-block>
```

As in any HTML, write `<` and `&` inside the code as `&lt;` and `&amp;`.

### With the `text` attribute

Alternatively, pass the code as a string in the `text` attribute:

```html
<va-code-block
  language="html"
  text='<button class="va-button">Example button</button>'
></va-code-block>
```

The code can't contain the quote character that wraps the attribute: use single quotes around code with double quotes, or the other way round. If both `text` and child content are present, `text` takes precedence.

### Multiple languages

Place several `<pre><code>` blocks inside the element and a select appears to switch between them. Each block takes its language from its `language-*` class, and its label from `data-label` on the `<pre>` (or the uppercased language). Use `selected` to choose the initial block:

```html
<va-code-block selected="bun">
  <pre data-label="npm"><code class="language-bash">npm i va-code-block</code></pre>
  <pre data-label="pnpm"><code class="language-bash">pnpm add va-code-block</code></pre>
  <pre data-label="bun"><code class="language-bash">bun add va-code-block</code></pre>
</va-code-block>
```

The copy button copies the active block. Without JavaScript, all blocks remain readable one after another.

### Dynamic updates

The component reacts to changes in its attributes and in its child content, so you can update it after the initial render:

```js
const el = document.querySelector('va-code-block')
el.setAttribute('text', 'console.log("hello")')
el.setAttribute('language', 'js')
```

## API

### Attributes

| Attribute  | Description                                                                                                       | Default value |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ------------- |
| `text`     | The code snippet to display. Falls back to the child content.                                                     | `''`          |
| `language` | Language for syntax highlighting. A block's `language-*` class takes precedence. Also available as `lang`.        | `'text'`      |
| `selected` | Active block when there are several, matched by `data-label` or language. Updated when the user picks another one. | First block   |

### Events

| Event    | Description                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------- |
| `change` | Fired when the user selects another block. `event.detail` contains `label`, `language` and `value`. |

### Styling

The component renders inside a shadow root. Its internal elements are exposed as parts that you can style with `::part()`:

| Part          | Element                                                      |
| ------------- | ------------------------------------------------------------ |
| `card`        | The outer container.                                         |
| `pre-content` | The `<pre>` that holds the highlighted code.                 |
| `select`      | The language select, shown when there are several blocks.    |

```css
va-code-block::part(pre-content) {
  max-height: 20rem;
  overflow: auto;
}
```

### Supported languages

| Language   | Values                           |
| ---------- | -------------------------------- |
| JavaScript | `javascript`, `js`, `jsx`        |
| TypeScript | `typescript`, `ts`, `tsx`        |
| CSS        | `css`                            |
| HTML       | `html`, `markup`, `xml`          |

Other languages, such as `bash`, render as plain text without errors and still show their label.

## Changelog

For a detailed record of changes, new features, and fixes in each version, see our [`CHANGELOG.md`](https://github.com/marcmarine/varvara-js/releases?q=va-code-block&expanded=true).

## License

MIT License © 2024 [Marc Mariné](https://github.com/marcmarine)
