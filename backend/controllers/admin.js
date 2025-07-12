const adminRouter = require('express').Router()
const Movie = require('../models/movie')

adminRouter.post('/', async (request, response) => {
  const m = request.body

  const movie = new Movie({
      title: m.title,
      imdbID: m.imdbID,
      year: m.year,
      summary: m.summary,
      rating: m.rating,
      genres: m.genres,
      runtime: m.runtime,
      director: m.director,
      writers: m.writers,
      cast: m.cast,
      poster: m.poster
  })

  const savedMovie = await movie.save()
  response.status(201).json(savedMovie)
})

adminRouter.delete('/:id', async (request, response) => {
  const movie = await Movie.findOne({ imdbId: request.params.id})
  if(movie){
    await Movie.findOneAndDelete({ imdbID: request.params.id })
    response.status(204).end()
  }
  response.status(404).end()
})

adminRouter.put('/:id', async (request, response) => {
  const movie = await Movie.findOne({imdbID: request.params.id })

  if(movie){
    const updatedMovie = await Movie
      .findByIdAndUpdate(movie._id.toString(), { 
        title: request.body.title ? request.body.title : movie.title,
        imdbID: request.body.imdbID ? request.body.imdbID : movie.imdbID,
        year: request.body.year ? request.body.year : movie.year,
        summary: request.body.summary ? request.body.summary : movie.summary,
        rating: request.body.rating ? request.body.rating : movie.rating,
        genres: request.body.genres ? request.body.genres : movie.genres,
        runtime: request.body.runtime ? request.body.runtime : movie.runtime,
        director: request.body.director ? request.body.director : movie.director,
        writers: request.body.writers ? request.body.writers : movie.writers,
        cast: request.body.cast ? request.body.cast : movie.cast,
        poster: request.body.poster ? request.body.poster : movie.poster
      })
    response.status(201).json(updatedMovie)
  }
  response.status(404).end()
})

module.exports = adminRouter