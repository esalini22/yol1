const scoreRouter = require('express').Router()
const User = require('../models/user')
const crypto = require('crypto')

scoreRouter.get('/:run/:dv', async(request, response) => {
    const user = await User.findByRut({ run: request.params.run, dv: request.params.dv })
    if (user) {
        const score = crypto.createHash('sha256').update(user.run).digest('hex')
        response.json(/*user, */{rut: run+"-"+dv, score, fecha: new Date()})
    } else {
        response.status(404).end()
    }
})

module.exports = scoreRouter