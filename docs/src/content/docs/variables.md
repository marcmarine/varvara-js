---
title: Css variables
---

# CSS Variables

## Colors

```css
--va-color-primary: var(--va-color-blue);
--va-background-primary: var(--va-color-primary);

--va-text-normal: #ffffff;
--va-text-weak: color-mix(in srgb, var(--va-text-normal) 20%, transparent);
```

## Border

```css
--va-border-width: 2px;
--va-border-color: var(--va-text-normal);
```

## Font Size

```css
--va-font-size-ratio: 1;

--va-font-size-00: calc(0.5rem * var(--va-font-size-ratio));
--va-font-size-0: calc(0.75rem * var(--va-font-size-ratio));
--va-font-size-1: calc(1rem * var(--va-font-size-ratio));
--va-font-size-2: calc(1.1rem * var(--va-font-size-ratio));
--va-font-size-3: calc(1.25rem * var(--va-font-size-ratio));
--va-font-size-4: calc(1.5rem * var(--va-font-size-ratio));
--va-font-size-5: calc(2rem * var(--va-font-size-ratio));
--va-font-size-6: calc(2.5rem * var(--va-font-size-ratio));
--va-font-size-7: calc(3rem * var(--va-font-size-ratio));
--va-font-size-8: calc(3.5rem * var(--va-font-size-ratio));
```

## Space

```css
--va-space-ratio: 1;

--va-space-000: calc(-0.5rem * var(--va-space-ratio));
--va-space-00: calc(-0.25rem * var(--va-space-ratio));
--va-space-1: calc(0.25rem * var(--va-space-ratio));
--va-space-2: calc(0.5rem * var(--va-space-ratio));
--va-space-3: calc(0.75rem * var(--va-space-ratio));
--va-space-4: calc(1rem * var(--va-space-ratio));
--va-space-5: calc(1.25rem * var(--va-space-ratio));
--va-space-6: calc(1.5rem * var(--va-space-ratio));
--va-space-7: calc(1.75rem * var(--va-space-ratio));
--va-space-8: calc(2rem * var(--va-space-ratio));
--va-space-9: calc(3rem * var(--va-space-ratio));
--va-space-10: calc(4rem * var(--va-space-ratio));
--va-space-11: calc(5rem * var(--va-space-ratio));
--va-space-12: calc(7.5rem * var(--va-space-ratio));
--va-space-13: calc(10rem * var(--va-space-ratio));
--va-space-14: calc(15rem * var(--va-space-ratio));
--va-space-15: calc(20rem * var(--va-space-ratio));
```
