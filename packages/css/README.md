# Varvara CSS

**Varvara CSS** is a library of prebuilt UI components designed for smooth and simple browsing experiences, implemented using simple class names and easily customizable with CSS Variables.

[![NPM Version](https://img.shields.io/npm/v/varvara-css?color=magenta)](https://www.npmjs.com/package/varvara-css)
[![GitHub License](https://img.shields.io/github/license/marcmarine/varvara-js)](https://github.com/marcmarine/varvara-js/blob/main/LICENSE)
[![TypeDoc](https://img.shields.io/badge/view-CHANGELOG.md-blue.svg)](https://github.com/marcmarine/varvara-js/blob/main/packages/css/CHANGELOG.md)
![Bundle Size](https://img.shields.io/npm/unpacked-size/varvara-css?color=cyan)

It can be used alongside Tailwind CSS and with any JavaScript framework.

## Install

### Tailwind CSS

To use Varvara CSS with Tailwind CSS, first install the package:

```bash
npm i varvara-css
```

Make sure [Tailwind CSS](https://tailwindcss.com/docs/installation) is already configured in your project.

#### Tailwind CSS v4

Register the plugin in your main stylesheet:

```css
@import 'tailwindcss';
@plugin 'varvara-css';
```

#### Tailwind CSS v3 

Add the plugin to your `
tailwind.config.js`:

```js
import varvara from 'varvara-css'

module.exports = {
  plugins: [varvara]
  // ...
}
```

### NPM

You can also integrate Varvara CSS into your own CSS build process.

Install the package:

```bash
npm i varvara-css
```

Then import it into your stylesheet:

```css
@import 'varvara-css/css';
```

> [!TIP]
> An @import rule must be defined at the top of the stylesheet

### CDN

For quick setups, you can load Varvara CSS directly from a CDN:

```css
@import url('https://unpkg.com/varvara-css');
```

Or include it in your HTML:

```html
<link href="https://unpkg.com/varvara-css" rel="stylesheet" type="text/css" />
```

Both methods include all CSS variables and components.

## Usage

Once installed Varvara CSS, copy and paste components classes to get started.

Simply add a component class like this:

```html
<button class="va-button">Example button</button>
```

## Customize

Each component already has its own CSS variables, with basic properties such as padding, background color, border, etc... You can modify to customize it.

```css
.va-button {
  --va-button-font-size: var(--va-font-size-2);
  --va-button-padding: var(--va-space-3);
  --va-button-border-width: var(--va-border-width);
  --va-button-border-color: var(--va-border-color);
  --va-button-background-color: var(--va-background-color-default);
}
```

Also you can override the styles if you prefer:

```css
.va-button {
  font-family: 'Rubik Variable', sans-serif;
}
```

## Changelog

For a detailed record of changes, new features, and fixes in each version, see our [`CHANGELOG.md`](https://github.com/marcmarine/varvara/blob/main/packages/css/CHANGELOG.md).

## Contributing

Feel free to explore, test, and provide feedback. Your contribution is highly appreciated as we work towards improving and stabilizing the project.

## License

MIT License © 2024 [Marc Mariné](https://github.com/marcmarine)
