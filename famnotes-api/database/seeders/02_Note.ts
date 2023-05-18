import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Note from 'App/Models/Note'
import { notes } from 'Database/data/Notes'

export default class extends BaseSeeder {
  public async run() {
    await Note.createMany(notes)
  }
}
