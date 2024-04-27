import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
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
        content: fields.markdoc({
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
  },
});