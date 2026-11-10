---
"varvara-css": minor
---

Added the `varvara-css/components` export, which includes every component without the global page styles. With Tailwind CSS v4, import `varvara-css/variables` and `varvara-css/components` into the `base` and `components` layers so utilities can override component styles; the plugin still works. Tailwind CSS v3 support is deprecated and will be removed in 1.0.
