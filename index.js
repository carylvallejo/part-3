const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./queries')
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
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(requestLogger)
app.use(cors())
app.use(express.static('build'))

/*
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
) */

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
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
  res.json(notes)
})

app.delete('/api/notes/:id', db.deleteNote, (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.get('/api/notes/:id', db.getNotesById, (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))


morgan.token('type', function (request, response) {
		return JSON.stringify(request.body)
}) 

let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

// 3.1
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//3.2
app.get('/info', (request, response) => {
  const date = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${date}}</p>`)
})

//3.3
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  person ? response.json(person) : response.status(404).end()
})

//3.4
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


const generateId = () => {
  const maxId = Math.floor(Math.random() * 500)
  return maxId 
}

//for 3.5
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  //for 3.6
  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  } 

  if (!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  } 

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  response.json(person)
}) 

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) */