import { Hasher } from '../criptography/hasher'
import faker from 'faker'

export class MockHasher implements Hasher {
  digest = faker.random.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext

    return this.digest
  }
}
