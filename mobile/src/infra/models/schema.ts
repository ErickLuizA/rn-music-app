import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'recent',
      columns: [
        { name: 'music_id', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'img', type: 'string', isOptional: true },
      ],
    }),
  ],
})
