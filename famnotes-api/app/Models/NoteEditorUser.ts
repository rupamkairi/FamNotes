import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Note from './Note'
import User from './User'

export default class NoteEditorUser extends BaseModel {
  public static table = 'note_editor_user'

  @column({ isPrimary: true })
  public id: number

  @column()
  public noteId: number
  @hasOne(() => Note, {
    localKey: 'noteId',
    foreignKey: 'id',
  })
  public note: HasOne<typeof Note>

  @column()
  public userId: number
  @hasOne(() => User, {
    localKey: 'userId',
    foreignKey: 'id',
  })
  public editonlyUsers: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
