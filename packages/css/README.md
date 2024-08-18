# Varvara CSS

![NPM Version (with dist tag)](https://img.shields.io/npm/v/varvara-css/alpha?style=for-the-badge&labelColor=cyan&color=fuchsia)

> [!NOTE]
> This package is currently in its alpha stage. It is actively being developed and tested. You may encounter bugs and incomplete features. Use it cautiously in production environments 🙏.

**Varvara CSS** is a library of prebuilt UI components designed for smooth and simple browsing experiences, implemented using simple class names and easily customizable with CSS Variables.

It can be used alongside Tailwind CSS and with any JavaScript framework.

## Install

### CDN

The easiest way to use Varvara CSS is through a CDN:

```css
@import url('https://unpkg.com/varvara-css@alpha');
```

Alternatively, add this line to the `head` tag of your HTML:

```html
<link
  href="https://unpkg.com/varvara-css@alpha"
  rel="stylesheet"
  type="text/css"
/>
```

You'll have access to both variables and components from the same import.

### NPM

Another option is to add Varvara CSS to your own build process:

```bash
npm i varvara-css@alpha
```

After, you have to import the package into your stylesheet:

```css
@import 'varvara-css/css';
```

> [!TIP]
> An @import rule must be defined at the top of the stylesheet

With both options, you have the ability to customize the components using CSS variables.

## Usage

Once installed Varvara CSS, copy and paste components classes to get started.

Simply add a component class like this:

```html
<button class="va-button">Example button</button>
```

## Customize

Each component already has its own CSS variables, with basic properties such as padding, background color, border, etc... You can modify to customize it.

```css
--va-button-font-size: var(--va-font-size-2);
--va-button-padding: var(--va-space-3);
--va-button-border-width: var(--va-border-width);
--va-button-border-color: var(--va-border-color);
--va-button-background-color: var(--va-surface-primary);
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
