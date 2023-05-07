import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'

export default class NotesController {
  public async index({ response, auth }: HttpContextContract) {
    let filter = {
      userFilter: auth.isAuthenticated ? { user_id: auth.user?.id } : { user_id: null },
    }

    let notes = await Note.query()
      .where(filter.userFilter)
      .preload('user', (usersQuery) => {
        usersQuery.select('email')
      })

    return response.json(notes)
  }

  public async create({}: HttpContextContract) {
    //
  }

  public async store({ request, response, auth }: HttpContextContract) {
    let data = {
      user_id: auth.user?.id,
      ...request.only(['title']),
    }

    let note = await Note.create(data)

    return response.json(note)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {
    //
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
