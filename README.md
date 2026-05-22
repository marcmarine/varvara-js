<p align="center">
  <picture >
    <source media="(prefers-color-scheme: dark)" srcset="./docs/public/va-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="./docs/public/va-light.svg">
    <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="./docs/public/va-dark.svg" width="240px" >
  </picture>
</p>

<h1 align="center">Varvara SDKs</h1>

<h3 align="center">Build consistently for seamless experiences</h3>

Designed to work standalone or alongside [Tailwind CSS](https://varvara.js.org/get-started/#tailwind-css)

---

## Motivation

Consistency creates predictable interfaces, scalable systems, and better user experiences. Varvara is designed around that idea.

## Get started

Install Varvara CSS using your preferred package manager:

```bash
pnpm add varvara-css
```

Import the styles in your application:

```css
@import "varvara-css/css";
```

After, simply add a component class like this:

```html
<button class="va-button">Example button</button>
```

Visit the [documentation](https://varvara.js.org) to explore all available components and customization options.

## Monorepo

Check out the list of packages inside this repository:

| Package                                     | Description                                                                                | Version                                                                                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| [**css**](packages/css)                     | Customizable components with CSS Variables using plain class names.                        | [![NPM Version](https://img.shields.io/npm/v/varvara-css?color=magenta)](https://www.npmjs.com/package/varvara-css)                  |
| [**typedoc-theme**](packages/typedoc-theme) | Varvara theme for TypeDoc.                                                                 | [![NPM Version](https://img.shields.io/npm/v/varvara-typedoc-theme?color=cyan)](https://www.npmjs.com/package/varvara-typedoc-theme) |
| [**code-block**](packages/code-block)       | A custom HTML element that renders code blocks with syntax highlighting and a copy button. | [![NPM Version](https://img.shields.io/npm/v/va-code-block?color=yellow)](https://www.npmjs.com/package/va-code-block)               |

Varvara is probably going to grow 🚀.

## Release notes

If you want to be aware of all the changes you can explore the [release notes](https://github.com/marcmarine/varvara/releases) or the individual `CHANGELOG.md` inside each package.

## Contributing

Feel free to explore, test, and provide feedback. Your contribution is highly appreciated as we work towards improving and stabilizing the project.

## License

MIT License © 2024 [Marc Mariné](https://github.com/marcmarine).
