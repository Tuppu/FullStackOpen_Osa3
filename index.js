const express = require('express')
const app = express()

app.use(express.json())

let phoneBook = 
  {
    "persons": [
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
        "id": "5c46",
        "name": "Tuomas Liikala",
        "number": "0405913064"
      },
      {
        "id": "0f3f",
        "name": "Hätänumero",
        "number": "112"
      }
    ]
  }


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${phoneBook.persons.length} people</p>
    <p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)