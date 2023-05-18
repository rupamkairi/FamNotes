import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.query()
      .preload('notes', (query) => query.select('title'))
      .preload('editonlyNotes', (query) => query.select('title'))
      .preload('viewonlyNotes', (query) => query.select('title'))

    return response.json(users)
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ request, response, auth }: HttpContextContract) {
    if (parseInt(request.param('id')) !== auth.user?.id) return response.forbidden()

    let userFilter = auth.isAuthenticated ? { id: auth.user?.id } : { user_id: null }
    let filter = { ...userFilter }

    const user = await User.query()
      .where(filter)
      .preload('notes', (query) => query.select('title'))
      .preload('editonlyNotes', (query) => query.select('title'))
      .preload('viewonlyNotes', (query) => query.select('title'))
      .first()

    return response.json(user)
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
