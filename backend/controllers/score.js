const scoreRouter = require('express').Router()
const User = require('../models/user')

scoreRouter.get('/:id', async(request, response) => {
    const user = await User.findOne({ rut: request.params.rut, dv: request.params.dv })
    if (user) {
        response.json(movie)
    } else {
        response.status(404).end()
    }
})

module.exports = scoreRouter