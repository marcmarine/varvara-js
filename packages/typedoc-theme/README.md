# Varvara TypeDoc Theme

Varvara TypeDoc Theme is a [custom theme](https://typedoc.org/documents/Development.Custom_Themes.html) for TypeDoc, designed to provide an seamless documentation experience for TypeScript projects.

[![license](https://img.shields.io/github/license/marcmarine/varvara-js)](https://github.com/marcmarine/varvara-js/blob/main/LICENSE)

## Prerequisites

Ensure TypeDoc is [installed](https://typedoc.org/index.html#quick-start) in your project.

## Installation

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
