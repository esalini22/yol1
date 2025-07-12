Prompt: in this code, I want the response to return the user and a hash value for the rut
const user = await User.findOne({ rut, dv })
if (user) {
    response.json({ user})
}

Respuesta: 
const user = await User.findOne({ rut, dv })
if (user) {
    // Create a hash of the rut (for example, SHA256)
    const hash = crypto.createHash('sha256').update(rut).digest('hex')
    response.json({ user, rutHash: hash })
}


Prompt: is this node syntax correct?
scoreRouter.get('/:run/:dv', async(request, response) => {
    const user = await User.findByRut({ run: request.params.run, dv: request.params.dv })
    if (user) {
        const score = crypto.createHash('sha256').update(user.run).digest('hex')
        response.json(/*user, */{rut: run+"-"+dv, score, fecha: new Date()})
    } else {
        response.status(404).end()
    }
})

Respuesta:
Your Node.js/Express code is mostly correct, but here are some small fixes and improvements:
Missing run and dv variable definitions in response.json(): You use run and dv without declaring them — should destructure from request.params.
Error handling: Wrap your DB call in try/catch to handle possible exceptions (recommended).

scoreRouter.get('/:run/:dv', async (request, response) => {
  const { run, dv } = request.params

  try {
    const user = await User.findByRut({ run, dv })

    if (user) {
      const score = crypto.createHash('sha256').update(user.run).digest('hex')
      response.json({ rut: `${run}-${dv}`, score, fecha: new Date() })
    } else {
      response.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Server error' })
  }
})

Prompt: I want this hash to be a number between 0 and 100
const score = crypto.createHash('sha256').update(user.run).digest('hex')

Respuesta:
const hash = crypto.createHash('sha256').update(user.run).digest('hex')
const numericHash = parseInt(hash.slice(0, 8), 16) // convert first 8 characters to a number
const score = numericHash % 101 // gives a number from 0 to 100