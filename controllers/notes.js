const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', db.createNotes, (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.get('/api/notes', db.getNotes, (req, res, next) => {
  Note.getNotes(request.params.id)
    .then(note => {
      if (note) {
        res.json(notes)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})


app.put('/api/notes/:id', db.updateNote, (req, res) => {
  const id = Number(request.params.id)
  notes = notes.find(note => note.id !== id)

  response.status(404).end()
})

//part 3 -- letter C
app.get('/api/notes/:id', db.getNotesById, (request, response) => {
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
  .catch(error => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  })
})

app.delete('/api/notes/:id', db.deleteNote, (request, response) => {
  const id = parseInt(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

module.exports = notesRouter