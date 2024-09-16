const people = require('mongoose')

people.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

people.connect(url)
.then(result => {
    console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new people.Schema({
  name: String,
  number: String,
})
  
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = people.model('Person', personSchema)