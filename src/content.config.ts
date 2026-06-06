import { defineCollection, z } from 'astro:content';

const stringArray = z.preprocess((value) => {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}, z.array(z.string()));

const shanghaiDate = z.preprocess((value) => {
  if (value instanceof Date) {
    return new Date(value.getTime() - 8 * 60 * 60 * 1000);
  }

  if (typeof value === 'string' && !/[zZ]|[+-]\d{2}:?\d{2}$/.test(value)) {
    return new Date(`${value.replace(' ', 'T')}+08:00`);
  }

  return value;
}, z.coerce.date());

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: shanghaiDate,
    updated: shanghaiDate.optional(),
    description: z.string().optional(),
    tags: stringArray.default([]),
    category: stringArray.default([]),
    layout: z.string().optional(),
    wxShareImgUrl: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
