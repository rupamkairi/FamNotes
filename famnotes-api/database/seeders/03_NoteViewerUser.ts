import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

const viewonlyNotesUsersMapping = [
  { note_id: 1, user_id: 2 },
  { note_id: 1, user_id: 3 },
  { note_id: 2, user_id: 1 },
  { note_id: 3, user_id: 1 },
]

export default class extends BaseSeeder {
  public async run() {
    // viewonly Model Required for seeding
  }
}
