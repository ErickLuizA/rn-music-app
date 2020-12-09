import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from '../models/schema'
import Recent from '../models/Recent'

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'yfmusicdb',
})

export const database = new Database({
  adapter,
  modelClasses: [Recent],
  actionsEnabled: true,
})
