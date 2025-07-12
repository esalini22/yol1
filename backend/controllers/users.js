const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (_request, response) => {
    const users = await User
        .find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    if(password.length < 3){
        response.status(500).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

//para añadir o quitar peliculas favoritas
usersRouter.put('/', async (request, response) => {
    const { username, favoriteMovies } = request.body //recibe arreglo de peliculas favoritas (con imdbID)

    const updatedUser = await User
        .findOneAndUpdate({username},{favoriteMovies})
    
    response.status(201).json(updatedUser)
})

module.exports = usersRouter