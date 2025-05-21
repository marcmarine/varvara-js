# varvara-css

## 0.7.2

### Patch Changes

- 6b82333: Allow importing styles for individual components
- 0f7a894: Correct color values for card and button

## 0.7.1

### Patch Changes

- ecfbda6: Fixed misspelled CSS custom properties
- 8402380: Update README

## 0.7.0

### Minor Changes

- 011d0e7: Refine icon styles and allow to customize its width
- 223ad85: Introduce new `--va-background-color-hover` CSS custom property
- 5114625: Introduce new link component
- 07dda52: Introduce new background and foreground CSS custom properties

### Patch Changes

- 342a8b5: Deprecate `--va-surface-primary` CSS custom property
- d9819d9: Deprecate `--va-background-primary` custom property
- 4ee04f9: Set `box-sizing` to `border-box` for checkbox component
- 7110ee2: Unify collapse, select and checkbox icon appearance 🚀
- 3a97a1f: Deprecate `--va-text-normal` custom property
- 139fd41: Correct background and foreground CSS custom properties names
- fea69ca: Set `box-sizing` to `border-box` for button and input components

## 0.6.0

### Minor Changes

- 4a37578: Introduce checkbox component

### Patch Changes

- 28043fe: Allow select nesting within collapse
- 96a380a: Enable nested checkboxes inside collapse component
- d541b85: Remove the option to customize the caret symbol for select

## 0.5.3

### Patch Changes

- 2d517cd: Fix input radius rendering on Safari iOS
- fff1e59: Fix invalid comment syntax causing parsing errors
- e047008: Remove Safari iOS marker from `<details>` element

## 0.5.2

### Patch Changes

- 18c8838: Make collapse appearance consistent with select component

## 0.5.1

### Patch Changes

- 11c0cf2: Remove unused card custom variable
- 9d1d699: Adjust table styles for consistency

## 0.5.0

### Minor Changes

- fdab0d0: Make consistent height for input, button, and select components
- 37c8a9c: Improve compatibility and flexibility of `color-scheme` CSS property handling

### Patch Changes

- e585bd7: Fix label display value for input and select fields

## 0.4.3

### Patch Changes

- d33ac99: Make custom properties fully overridable
- 92e4cd6: Align select component with inputs
- d962b89: Resolve visual inconsistencies in input fields
- 9817c8b: Allow using both light and dark operating system color schemes
- c8a252b: Fix button text color inheritance

## 0.4.2

### Patch Changes

- ed55f6d: Update default CSS variables for background and foreground

## 0.4.1

### Patch Changes

- 45c0c0a: Change build output format from CommonJS to ES6
- 4add942: Fix padding and border issues in input fields

## 0.4.0

### Minor Changes

- 41b886e: Introduce `va-loading-dots` class name for loading animation
- 6c03d41: Introduce new Collapse component

## 0.3.0

### Minor Changes

- 312a8d6: Introduce new Input component

### Patch Changes

- 2700ffc: Added focus styles to button elements

## 0.2.1

### Patch Changes

- 2238132: Refine styles for Select component:

  - Adjust spacing for more proportional layout.
  - Introduce `--va-select-caret-width` CSS variable.

- 3178fbc: Correct Select border radius issue in Safari

## 0.2.0

### Minor Changes

- ebb69c0: Add button active and disabled classes
- 9b68160: Introduce TailwindCSS Plugin

  - Improved conversion of CSS files to JS.
  - Created distribution file for the plugin in the `/dist` directory.
  - Updated build process to generate the new distribution file.

  Enhances the TailwindCSS plugin with better CSS-to-JS conversion and distribution setup.

- 17219f7: Create new card component
- aaba9e4: Create table component
- ad20ca3: Improve button group and button components
- 0f9b4ce: Add the prefix `va-` to class names
- 087b8d1: Updated export structure to simplify importing:

  - Tailwind plugin is now imported from the root
  - Styles are imported from the `/css` directory

- 76a5e62: Introduce `va-base` and `va-components` cascade layer names.
- fee7fae: Add new CSS variables with prefix
- c83f3a0: Remove themes and export global bundle styles
- dfe81d9: Introduce CSS variables for foreground and background colors in dark mode, ready to use out-of-the-box.

### Patch Changes

- 876e1e4: Adjust styles for Select component
- cfd0134: Fix border color CSS variable
- 8f6e37a: Fix export of tailwind plugin
- 917d378: Transform `@import` rules by inlining content.
- d973927: Allows to import `varvara.css` from the root entry point of the package.
- bddbfea: Updated select component styles to use variables
- 8d741ae: Update CSS variables
- 2760447: Fix button variant styles

## 0.2.0-alpha.15

### Patch Changes

- 876e1e4: Adjust styles for Select component

## 0.2.0-alpha.14

### Minor Changes

- dfe81d9: Introduce CSS variables for foreground and background colors in dark mode, ready to use out-of-the-box.

## 0.2.0-alpha.13

### Minor Changes

- 087b8d1: Updated export structure to simplify importing:

  - Tailwind plugin is now imported from the root
  - Styles are imported from the `/css` directory

## 0.2.0-alpha.12

### Minor Changes

- 9b68160: Introduce TailwindCSS Plugin

  - Improved conversion of CSS files to JS.
  - Created distribution file for the plugin in the `/dist` directory.
  - Updated build process to generate the new distribution file.

  Enhances the TailwindCSS plugin with better CSS-to-JS conversion and distribution setup.

## 0.2.0-alpha.11

### Patch Changes

- bddbfea: Updated select component styles to use variables

## 0.2.0-alpha.10

### Minor Changes

- 76a5e62: Introduce `va-base` and `va-components` cascade layer names.

### Patch Changes

- d973927: Allows to import `varvara.css` from the root entry point of the package.

## 0.2.0-alpha.9

### Minor Changes

- 0f9b4ce: Add the prefix `va-` to class names

### Patch Changes

- 8d741ae: Update CSS variables

## 0.2.0-alpha.8

### Minor Changes

- c83f3a0: Remove themes and export global bundle styles

## 0.2.0-alpha.7

### Minor Changes

- 17219f7: Create new card component
- aaba9e4: Create table component

## 0.2.0-alpha.6

### Patch Changes

- 2760447: Fix button variant styles

## 0.2.0-alpha.5

### Minor Changes

- ebb69c0: Add button active and disabled classes

## 0.2.0-alpha.4

### Patch Changes

- cfd0134: Fix border color CSS variable

## 0.2.0-alpha.3

### Minor Changes

- fee7fae: Add new CSS variables with prefix

## 0.2.0-alpha.2

### Minor Changes

- ad20ca3: Improve button group and button components

## 0.1.1-alpha.1

### Patch Changes

- 917d378: Transform `@import` rules by inlining content.

## 0.1.1-alpha.0

### Patch Changes

- 8f6e37a: Fix export of tailwind plugin
