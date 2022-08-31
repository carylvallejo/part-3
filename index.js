const express = require('express')
const app = express()
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

//transfer to another file --start
/*const cors = require('cors')
const db = require('./queries')
const { response } = require('express') /* -- end

//const bodyParser = require('body-parser')

// const pgtools = require("pgtools");

// const Client = require('pg').Client

// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "postgrespw",
//   database: "myFirstDb"
// })

// client.connect();

// client.query(`Select * from notes`, (req, res) => {
//   if (req) {
//     console.log(res.rows);
//   } client.end
// }) 
/*
client.query(`Select * from notes`, (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message)
  }
    client.end
}) */

// const config = {
//   user: "postgres",
//   host: "localhost",
//   password: "postgrespw",
//   port: 5432
// };

// pgtools.createdb(config, "myFirstDb", function(err, res) {
//   if (err) {
//     console.error(err);
//     process.exit(-1);
//   }
//   console.log(res);
// });
/*
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-01-10T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-01-10T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-01-10T19:20:14.298Z",
    important: true
  }
] */

/*
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
) */


///transfer to another file -- start
/*const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())

//notes.js
app.get('/', (req, res) => {
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

app.get('/api/notes', db.getNotes, (req, res) => {
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


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) */ //end

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})