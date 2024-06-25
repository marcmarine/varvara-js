---
title: Get started
---

# Get started

**Varvara CSS** is a framework that adds customizable components to your project using class names. You can use it alongside Tailwind CSS and with any JavaScript framework.

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

You'll have access to both [variables](/variables) and [components](/components) from the same import.

### NPM

Another option is to add Varvara CSS to your own build process:

```bash
npm i varvara-css@alpha
```

After, you have to import the package into your stylesheet:

```css
@import 'varvara-css/variables';
@import 'varvara-css/components';
```

> An @import rule must be defined at the top of the stylesheet

With both options, you have the ability to customize the components using [CSS variables](/variables).

## Use

Once installed Varvara CSS, copy and paste [components](/components) classes to get started.

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
...
```

Also you can override the styles if you prefer:

```css
.va-button {
  font-family: 'Rubik Variable', sans-serif;
}
```
