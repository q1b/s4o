// 1. Import utilities from `astro:content`
import { z,defineCollection, reference } from 'astro:content';
// 2. Define your collection(s)
const articlesCollection = defineCollection({ 
    type: 'content', // v2.5.0 and later
    schema: z.object({
        title: z.string(),
        description: z.string(),
        draft: z.boolean(),
        pubDate: z.date(),
        thumbnail: z.string().optional(),
        tags: z.array(reference('tags')),
    }),
});

const tagsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
    }),
})

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'articles': articlesCollection,
  'tags': tagsCollection,
};

