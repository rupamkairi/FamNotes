import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ManyToMany,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public userId: number
  @belongsTo(() => User, {
    foreignKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'note_viewer_user',
    localKey: 'id',
    pivotForeignKey: 'note_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  public viewonlyUsers: ManyToMany<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'note_editor_user',
    localKey: 'id',
    pivotForeignKey: 'note_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  public editonlyUsers: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
