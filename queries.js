const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'notesdb',
  password: 'postgrespw',
  port: 5432,
})

const getNotes = (request, response) => {
  pool.query('SELECT * FROM notes_table ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getNotesById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM notes_table WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createNotes = (request, response) => {
  const { content } = request.body

  pool.query('INSERT INTO notes_table (content) VALUES ($1) RETURNING id', [content], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Notes added with ID: ${results.rows[0].id}`);
  })
}

const updateNote = (request, response) => {
  const id = parseInt(request.params.id)
  const { content } = request.body

  pool.query(
    'UPDATE notes_table SET content = $1 WHERE id = $2',
    [content, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Notes modified with ID: ${id}`)
    }
  )
} 

const deleteNote = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM notes_table WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Note deleted with ID: ${id}`)
  })
}  

module.exports = {
  getNotes,
  getNotesById,
  createNotes,
  updateNote,
  deleteNote,
}