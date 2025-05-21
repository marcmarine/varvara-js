# Varvara 🤦‍♀️ Code Block

A custom HTML element that renders code blocks with syntax highlighting and a copy button.

> [!IMPORTANT]
> This component is in an early development stage. The API is not yet stable and may change in future releases.

The syntax highlighting is powered by [Prism.js](https://www.npmjs.com/package/prismjs).

## Installation

### Using CDN

```html
<script type="module" src="https://unpkg.com/va-code-block"></script>
```

## Usage

### In HTML

```html
<va-code-block
  language="html"
  theme="nord"
  text='<link
  href="https://unpkg.com/varvara-css"
  rel="stylesheet"
  type="text/css"
/>'
></va-code-block>
```

### Attributes

| Attribute  | Description                            | Example                        |
| ---------- | -------------------------------------- | ------------------------------ |
| `text`     | The code snippet you want to highlight | `console.log('Hello, world.')` |
| `language` | Language for syntax highlighting       | `language="html"`              |
| `theme`    | (Optional) Theme toggle or variant     | `theme="nord"`                 |

> The `theme` attribute should match [Prism.js's additional themes](https://github.com/PrismJS/prism-themes/tree/master/themes).

## License

MIT License © 2024 [Marc Mariné](https://github.com/marcmarine)
