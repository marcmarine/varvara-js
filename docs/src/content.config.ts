import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const components = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/components' }),
  schema: z.object({
    title: z.string(),
  }),
})

const docs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
  }),
})

export const collections = { components, docs }
