const scoreRouter = require('express').Router()
const User = require('../models/user')
const crypto = require('crypto')

scoreRouter.get('/:rut', async (request, response) => {
  console.log(request.params.rut)
  const [ run, dv ] = request.params.rut.split('-')
  console.log(run)
  console.log(dv)

  try {
    const user = await User.findByRut({ run: run, dv: dv })

    if (user) {
        const hash = crypto.createHash('sha256').update(user.run).digest('hex')
        const numericHash = parseInt(hash.slice(0, 8), 16)
        const score = numericHash % 101
      response.json({ rut: `${run}-${dv}`, score, fecha: new Date() })
    } else {
      response.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Server error' })
  }
})

module.exports = scoreRouter