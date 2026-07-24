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

### Using NPM

```bash
npm i va-code-block
```

## Usage

### In HTML

You can use the component directly in your HTML:

```html
<va-code-block
  language="html"
  text='<link
  href="https://unpkg.com/varvara-css"
  rel="stylesheet"
  type="text/css"
/>'
></va-code-block>
```

The `text` attribute should contain the code snippet as a single string. Escaping is handled internally.

### Attributes

| Attribute  | Description                                    | Default value |
| ---------- | ---------------------------------------------- | ------------- |
| `text`     | The code snippet you want to display.          | `''`          |
| `language` | Language of the code.                          | `'text'`      |

## Changelog

For a detailed record of changes, new features, and fixes in each version, see our [`CHANGELOG.md`](https://github.com/marcmarine/varvara-js/releases?q=va-code-block&expanded=true).

## License

MIT License © 2024 [Marc Mariné](https://github.com/marcmarine)
