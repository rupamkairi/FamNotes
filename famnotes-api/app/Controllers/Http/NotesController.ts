import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'

export default class NotesController {
  public async index({ response, auth }: HttpContextContract) {
    let userFilter = auth.isAuthenticated ? { user_id: auth.user?.id } : { user_id: null }
    let filter = { ...userFilter }

    let notes = await Note.query()
      .where(filter)
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

  public async update({ request, response, auth, bouncer }: HttpContextContract) {
    let userFilter = {}
    // let userFilter = auth.isAuthenticated ? { user_id: auth.user?.id } : { user_id: null }
    let filter = { id: request.param('id'), ...userFilter }
    let update = { ...request.only(['title']) }

    let note = await Note.query().where(filter).firstOrFail()
    if (await bouncer.denies('check:write', note))
      return response.forbidden('Not authorized to perform this action')
    else {
      let updated = await Note.query().where(filter).update(update).returning('title')
      console.log('updated is independent', updated)

      return response.ok(updated[0] ? 'Success' : 'Failed')
    }
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    let userFilter = auth.isAuthenticated ? { user_id: auth.user?.id } : { user_id: null }
    let filter = { id: request.param('id'), ...userFilter }

    const note = await Note.query().where(filter).delete()

    return response.ok(note[0] ? 'Success' : 'Failed')
  }
}
