import { z,defineCollection, reference } from 'astro:content';

const homepageData = defineCollection({
    type: 'data',
    schema: z.object({
        displayName: z.string(),
        profile_pic: z.string(),
        description: z.string(),
        description_alt: z.string().optional(),
        image1: z.string(),
        image2: z.string(),
        image3: z.string(),
        image4: z.string(),
    })
})

const testimonialsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        content: z.string(),
        avatar: z.string(),
        date: z.date(),
        description: z.string().optional(),
    }),
})

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
  'homepage': homepageData,
  'testimonials': testimonialsCollection,
};
