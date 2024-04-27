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
        draft: fields.checkbox({
          label: "Draft",
          description: "Draft aren't showing in the index",
        }),
        content: fields.document({
          label: 'Content',
          description: 'The content of the post.',
          formatting: true
        }),
        categories: fields.multiRelationship({
          label: 'Tags',
          collection: 'tags',
        })
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