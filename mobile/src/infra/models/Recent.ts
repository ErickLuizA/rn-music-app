import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class Recent extends Model {
  static table = 'recent'

  @field('music_id') music_id: any
  @field('title') title: any
  @field('img') img: any
}
