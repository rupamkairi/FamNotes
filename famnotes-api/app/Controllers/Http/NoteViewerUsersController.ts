import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'
import NoteViewerUser from 'App/Models/NoteViewerUser'
import User from 'App/Models/User'

export default class NoteViewerUsersController {
  public async index({ request, response, auth }: HttpContextContract) {
    const filter = { noteId: request.param('id') }

    const viewers = await NoteViewerUser.query()
      .where(filter)
      .select(['note_id', 'user_id', 'created_at'])
      .preload('viewonlyUsers')
      .groupBy(['user_id', 'created_at'])
      .orderBy('created_at', 'asc')

    if (!viewers.length) return response.notFound()

    let result: {
      note_id: number
      user_id: number[]
      viewonlyUsers: any
    } = {
      note_id: filter.noteId,
      user_id: [],
      viewonlyUsers: [],
    }
    for (let i = 0; i < viewers.length; i++) {
      result.user_id.push(viewers[i].toJSON()?.user_id)
      result.viewonlyUsers.push(viewers[i].toJSON()?.viewonlyUsers)
    }

    return response.json(result)
  }

  public async store({ request, response, auth, bouncer }: HttpContextContract) {
    try {
      if (!auth.isAuthenticated) return response.forbidden()

      const data = {
        noteId: +request.param('id'),
        userId: request.input('user_id'),
        email: request.input('email'),
      }

      let userFilter = auth.isAuthenticated ? { user_id: auth.user?.id } : { user_id: null }
      let filter = { id: +request.param('id'), ...userFilter }

      let note = await Note.query().where(filter).first()
      if (await bouncer.denies('check:write', note))
        return response.forbidden('Not authorized to perform this action')
      else {
        if (!data.userId) {
          const user = await User.query().where({ email: data.email }).first()
          if (!user) return response.notFound()
          data.userId = user?.id
        }

        delete data.email
        const created = await NoteViewerUser.create(data)

        return response.status(201).json(created)
      }
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async show({ request, response, auth }: HttpContextContract) {
    return response.status(200).json({ params: request.params(), body: request.body() })
  }

  public async update({ request, response, auth }: HttpContextContract) {
    return response.notFound()
  }

  public async delete({ request, response, auth, bouncer }: HttpContextContract) {
    try {
      if (!auth.isAuthenticated) return response.forbidden()

      const data = {
        noteId: +request.param('id'),
        userId: +request.param('user_id'),
      }

      // viewer removing itself
      if (auth.user?.id !== data.userId) {
        // viewer not removing itself

        let userFilter = auth.isAuthenticated ? { user_id: auth.user?.id } : { user_id: null }
        let filter = { id: +request.param('id'), ...userFilter }

        // owner
        let note = await Note.query().where(filter).first()
        if (await bouncer.denies('check:write', note))
          return response.forbidden('Not authorized to perform this action')
      }

      const deleted = await NoteViewerUser.query().where(data).delete()

      return response.status(200).json(deleted)
    } catch (error) {
      console.log(error)
      return response.badRequest(error)
    }
  }
}
