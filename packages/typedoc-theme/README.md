# Varvara TypeDoc Theme

_View a_ [_live example here_](https://marcmarine.github.io/western-signs).

Varvara TypeDoc Theme is a custom theme for TypeDoc, designed to provide a seamless documentation experience for TypeScript projects.

![NPM Version](https://img.shields.io/npm/v/varvara-typedoc-theme)
[![GitHub License](https://img.shields.io/github/license/marcmarine/varvara-js)](https://github.com/marcmarine/varvara-js/blob/main/LICENSE)

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

## Contributing

Feel free to explore, test, and provide feedback. Your contribution is highly appreciated as we work towards improving and stabilizing the project.

## License

This project is licensed under the [MIT License](https://github.com/marcmarine/varvara-js/blob/main/LICENSE).
