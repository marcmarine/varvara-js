# Varvara TypeDoc Theme

_View a_ [_live example here_](https://marcmarine.github.io/western-signs).

Varvara TypeDoc Theme is a custom theme for TypeDoc, designed to provide a seamless documentation experience for TypeScript projects.

[![NPM Version](https://img.shields.io/npm/v/varvara-typedoc-theme)](https://www.npmjs.com/package/varvara-typedoc-theme)
[![GitHub License](https://img.shields.io/github/license/marcmarine/varvara-js)](https://github.com/marcmarine/varvara-js/blob/main/LICENSE)
[![TypeDoc](https://img.shields.io/badge/view-CHANGELOG.md-blue.svg)](https://github.com/marcmarine/varvara-js/blob/main/packages/typedoc-theme/CHANGELOG.md)

## Installation

Ensure TypeDoc is [installed](https://typedoc.org/index.html#quick-start) in your project.

Install the Varvara TypeDoc theme as a development dependency:

```bash
npm install varvara-typedoc-theme --save-dev
```

## Usage

### Method 1: Command-Line Interface (CLI)

Use the following command to generate documentation with the Varvara theme:

```bash
npx typedoc --plugin varvara-typedoc-theme --theme varvara
```

### Method 2: Configuration File

Create a `typedoc.js` configuration file in your project's root directory:

> [!NOTE]
> You can use various TypeDoc [configuration files](https://typedoc.org/documents/Options.Configuration.html) to customize your documentation generation.

```js
/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  // Specify the Varvara theme plugin
  plugin: ['varvara-typedoc-theme'],

  // Set the theme to Varvara
  theme: 'varvara',

  // Optional: Include version information
  includeVersion: true

  // Additional TypeDoc configuration options
  // ... other options as needed
}

export default config
```

> [!IMPORTANT]
> The theme must be explicitly specified. If not set, the plugin will not be loaded by default.

### Customization

Add custom styling by specifying an extra CSS file using the [customCss](https://typedoc.org/documents/Options.Output.html#customcss) option:

```bash
npx typedoc --customCss ./styles/custom.css
```

Varvara CSS provides variables to customize the theme appearance:

```css
/* custom.css */

@media (prefers-color-scheme: light) {
  :root {
    --va-foreground-color-default: DimGray;
    --va-background-color-default: WhiteSmoke;
    --va-border-color: Gainsboro;
    --va-space-ratio: 0.5;
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    --va-foreground-color-default: Silver;
    --va-background-color-default: MidnightBlue;
    --va-border-color: RoyalBlue;
    --va-space-ratio: 0.5;
  }
}

[data-theme='light'] {
  --va-foreground-color-default: DimGray;
  --va-background-color-default: WhiteSmoke;
  --va-border-color: Gainsboro;
  --va-space-ratio: 0.5;
}

[data-theme='dark'] {
  --va-foreground-color-default: Silver;
  --va-background-color-default: MidnightBlue;
  --va-border-color: RoyalBlue;
  --va-space-ratio: 0.5;
}
```

See the [documentation](https://varvara.js.org/variables) for the complete list of available properties.

## Contributing

Feel free to explore, test, and provide feedback. Your contribution is highly appreciated as we work towards improving and stabilizing the project.

## License

This project is licensed under the [MIT License](https://github.com/marcmarine/varvara-js/blob/main/LICENSE).
