import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { users } from 'Database/data/Users'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany(users)
  }
}
