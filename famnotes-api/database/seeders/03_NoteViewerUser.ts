import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import NoteViewerUser from 'App/Models/NoteViewerUser'

const viewonlyNotesUsersMapping = [
  { noteId: 1, userId: 2 },
  { noteId: 1, userId: 3 },
  { noteId: 2, userId: 1 },
  { noteId: 3, userId: 1 },
]

export default class extends BaseSeeder {
  public async run() {
    await NoteViewerUser.createMany(viewonlyNotesUsersMapping)
  }
}
