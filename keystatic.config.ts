import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Website CMS',
    },
    navigation: ['---','articles', 'tags','---','homepage', 'testimonials','faqs',],
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage/',
      schema: {
        seo: fields.object({
          title: fields.text({ label: 'Site Title' }),
          description: fields.text({ label: 'Site Description' }),
        }),
        displayName: fields.text({ label: 'Your Name' }),
        profile_pic: fields.image({
          label: 'Profile Picture',
          directory: 'src/assets/images/homepage',
          publicPath: '/src/assets/images/homepage/'
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        description_alt: fields.text({ label: 'Description ( optional )', multiline: true }),
        image1: fields.image({
          label: 'Image 1 7/5 ratio',
          directory: 'src/assets/images/homepage',
          publicPath: '/src/assets/images/homepage/'
        }),
        image2: fields.image({
          label: 'Image 2 (4/3 ratio)',
          directory: 'src/assets/images/homepage',
          publicPath: '/src/assets/images/homepage/'
        }),
        image3: fields.image({
          label: 'Image 3 (7/5 ratio)',
          directory: 'src/assets/images/homepage',
          publicPath: '/src/assets/images/homepage/'
        }),
        image4: fields.image({
          label: 'Image 4 (4/3 ratio)',
          directory: 'src/assets/images/homepage',
          publicPath: '/src/assets/images/homepage/'
        }),
      }
    }),
    faqs: singleton({
      label: 'Frequently Asked Questions',
      path: 'src/content/faqs/',
      entryLayout: 'form',
      schema: {
        faqs: fields.array(fields.object({
          question: fields.text({ label: 'Question' }),
          answer: fields.text({ label: 'Answer', multiline: true }),
        }),{
            label: 'FAQ',
            itemLabel: props => `${props.fields.question.value}`
        }),
      },
    }),
  },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Draft aren't showing in the index",
        }),
        pubDate: fields.date({ label: 'Pub Date' }),
        thumbnail: fields.image({
          label: 'Thumbnail',
          directory: 'src/assets/images/articles',
          // Use the @assets path alias
          // publicPath: '@assets/images/articles/'
          publicPath: '/src/assets/images/articles/'
        }),
        tags: fields.multiRelationship({
          label: 'Tags',
          collection: 'tags',
        }),
        content: fields.document({
          label: 'Content',
          description: 'The content of the post.',
        }),
      },
    }),
    // Colección que pertenece a los autores
    tags: collection({
      label: "Tag",
      slugField: "name",
      path: "src/content/tags/*",
      format: {
        data: "json",
      },
      schema: {
        name: fields.slug({ name: { label: "Tag" } }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      path: 'src/content/testimonials/*',
      entryLayout: 'form',
      slugField: 'name',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        description: fields.text({ label: 'Description ( optional )' }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'src/assets/images/testimonials',
          publicPath: '/src/assets/images/testimonials/'
        }),
        date: fields.date({ label: 'Date' }),
        content: fields.text({ label: 'Content', multiline: true }),
      },
    }),
  },
});