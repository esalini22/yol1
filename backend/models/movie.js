const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {    
        type: String,
        required: true
    },
    imdbID: {
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },
    year: {
        type: Number
    },
    summary: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    genres: [
        {
            type: String
        }
    ],
    runtime: {
        type: String
    },
    director: {
        type: String
    },
    writers: [
        {
            type: String
        }
    ],
    cast: [
        {
            type: String
        }
    ],
    poster: {
        type: String
    }
})

movieSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie