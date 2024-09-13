const express = require('express')
const morgan = require('morgan')

const app = express()

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": "1"
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": "2"
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": "3"
  },
  {
    "id": "4",
    "name": "Tuomas Liikala",
    "number": "0405913064"
  },
  {
    "id": "5",
    "name": "Hätänumero",
    "number": "112"
  }
]

morgan('tiny')

let morgan_logger = morgan(':method :url :status :res[content-length] - :response-time ms');
app.use(morgan_logger);
app.use(express.json())

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
  
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
;
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const personFound = persons.find(person => person.name === body.name)
  if (personFound) {
    return response.status(409 ).json({ 
      error: 'name must be unique' 
    })
  }


  const person = {
    name: body.name,
    number: body.number,
    id: getRandomInt(2147483647),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)