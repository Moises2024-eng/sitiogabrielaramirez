import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(['EDUCACIÓN', 'MINDFULNESS', 'LIFESTYLE', 'PRÓXIMAMENTE']),
    image: z.string(),
    author: z.string().default('Gabriela Ramírez'),
  }),
});

export const collections = { blog };
