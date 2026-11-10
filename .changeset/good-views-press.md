---
"varvara-css": minor
---

Improved collapse indentation: nesting depth now counts collapse ancestors, so wrapper elements no longer add extra indentation, and supports up to 6 levels. Cards, tables, button groups, inputs and selects inside labels are now indented while keeping their borders full width, and your own components can read the new `--va-inset-start` custom property.
