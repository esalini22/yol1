const moviesRouter = require('express').Router()
const Movie = require('../models/movie')

moviesRouter.get('/', async (_request, response) => {
    const movies = await Movie.find({})
    response.json(movies)
})

moviesRouter.get('/:id', async(request, response) => {
    const movie = await Movie.findOne({ imdbID: request.params.id })
    if (movie) {
        response.json(movie)
    } else {
        response.status(404).end()
    }
})

module.exports = moviesRouter