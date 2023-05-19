import Route from '@ioc:Adonis/Core/Route'

Route.resource('notes', 'NotesController')
Route.group(() => {
  Route.group(() => {
    Route.get('/', 'NoteViewerUsersController.index').as('index')
    Route.post('/', 'NoteViewerUsersController.store').as('store')
    Route.get('/:user_id', 'NoteViewerUsersController.show').as('show')
    Route.patch('/:user_id', 'NoteViewerUsersController.update').as('update')
    Route.delete('/:user_id', 'NoteViewerUsersController.delete').as('delete')
  })
    .as('viewers')
    .prefix('/viewers')
})
  .as('notes')
  .prefix('/notes/:id')
