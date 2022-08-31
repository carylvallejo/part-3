const notesRouter = require('express').Router()
const { response } = require('express')
const Note = require('../models/note')

notesRouter.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

//done
notesRouter.post('/api/notes', db.createNotes, (request, response, next) => {
  const body = request.body

  // if (body.content === undefined) {
  //   return response.status(400).json({ error: 'content missing' })
  // }

  const note = new Note ({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
  // notes = notes.concat(note)

  // response.json(note)
})

//done
notesRouter.get('/api/notes', db.getNotes, (req, res, next) => {
  notes.find(note => note.id === id).then(notes => {
    res.json(notes)
  })
})

//done
notesRouter.put('/api/notes/:id', db.updateNote, (req, res) => {
  const body = request.body
  const id = Number(request.params.id)
  const notes = notes.find(note => note.id !== id)

  const note = {
    content: body.content,
    important: body.important,
  }
  response.status(404).end()
})

//part 3 -- letter C --done
notesRouter.get('/api/notes/:id', db.getNotesById, (request, response, next) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  note.getNotesById(request.params.id)
  .then(note => {
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
  .catch(error => next(error))
})

//done
notesRouter.delete('/api/notes/:id', db.deleteNote, (request, response) => {
  const id = parseInt(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

module.exports = notesRouter