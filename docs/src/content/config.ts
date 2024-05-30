import { z, defineCollection } from 'astro:content'

const components = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string()
  })
})

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string()
  })
})

export const collections = { components, docs }
