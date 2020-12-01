import { IRecentLocalClient } from '../../data/protocols/IRecentLocalClient'
import { Recent } from '../../domain/entities/Recent'
import { database } from '../services/database'

export class RecentLocalClient implements IRecentLocalClient {
  recentCollection = database.collections.get('recent')

  async create(params: Recent): Promise<any> {
    await database.action(async () => {
      await this.recentCollection.create((music: any) => {
        music.music_id = params.id
        music.title = params.title
        music.img = params.img
      })
    })
  }

  async get(): Promise<any> {
    const result = await this.recentCollection.query().fetch()

    if (result.length > 20) {
      await database.action(async () => {
        for (let i = 0; i < result.length - 20; i++) {
          await result[i].destroyPermanently()
        }
      })
    }

    return result
  }
}
