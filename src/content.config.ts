import { defineCollection, z } from 'astro:content';

const stringArray = z.preprocess((value) => {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}, z.array(z.string()));

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
    tags: stringArray.default([]),
    category: stringArray.default([]),
    layout: z.string().optional(),
    wxShareImgUrl: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
