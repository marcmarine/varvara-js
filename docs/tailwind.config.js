/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    borderColor: {
      DEFAULT: 'var(--va-foreground-color-default)'
    }
  }
}
