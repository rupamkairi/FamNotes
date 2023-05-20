import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'
import NoteEditorUser from 'App/Models/NoteEditorUser'
import NoteViewerUser from 'App/Models/NoteViewerUser'

export default class NotesController {
  public async index({ response, auth }: HttpContextContract) {
    let userFilter = auth.isAuthenticated ? { user_id: auth.user?.id } : { user_id: null }
    let filter = { ...userFilter }

    let ownNotes = await Note.query()
      .where(filter)
      .preload('user')
      .preload('viewonlyUsers', (query) => {
        query.select('email')
      })
      .preload('editonlyUsers', (query) => {
        query.select('email')
      })

    let editNotes = await NoteEditorUser.query()
      .where(userFilter)
      .preload('note', (noteQuery) => {
        noteQuery
          .preload('user')
          .preload('viewonlyUsers', (query) => {
            query.select('email')
          })
          .preload('editonlyUsers', (query) => {
            query.select('email')
          })
      })

    let viewNotes = await NoteViewerUser.query()
      .where(userFilter)
      .preload('note', (noteQuery) => {
        noteQuery
          .preload('user')
          .preload('viewonlyUsers', (query) => {
            query.select('email')
          })
          .preload('editonlyUsers', (query) => {
            query.select('email')
          })
      })

    let editonlyNotes = editNotes.map((el) => el.note)
    let editonlyNotesIds = editNotes.map((el) => el.noteId)
    let viewonlyNotes = viewNotes
      .filter((el) => !editonlyNotesIds.includes(el.noteId))
      .map((el) => el.note)

    let notes = {
      notes: ownNotes,
      shared: {
        editonlyNotes,
        viewonlyNotes,
      },
    }

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
    // let userFilter = {}
    let userFilter = auth.isAuthenticated ? { user_id: auth.user?.id } : { user_id: null }
    let filter = { id: +request.param('id'), ...userFilter }
    let update = { ...request.only(['title']) }

    let note = await Note.query().where(filter).first()

    if (!note) {
      let filter = { note_id: +request.param('id'), ...userFilter }
      let editNote = await NoteEditorUser.query().where(filter).preload('note').first()
      note = editNote?.note!
    }

    if (!note) return response.notFound('Failed')
    else {
      // if (await bouncer.denies('check:write', note))
      //   return response.forbidden('Not authorized to perform this action')
      // else {
      let updated = await Note.query().where({ id: note.id }).update(update)
      return response.ok(updated[0] ? 'Success' : 'Failed')
      // }
    }
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    let userFilter = auth.isAuthenticated ? { user_id: auth.user?.id } : { user_id: null }
    let filter = { id: request.param('id'), ...userFilter }

    const note = await Note.query().where(filter).delete()

    return response.ok(note[0] ? 'Success' : 'Failed')
  }
}
