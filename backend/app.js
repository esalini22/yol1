const config = require('./utils/config')
const express = require('express')
require('express-async-errors') //ya no es necesario try and catch y next(exception)
const app = express()
const cors = require('cors')
const scoreRouter = require('./controllers/score')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const path = require('path');

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/score', middleware.checkUserAgent, moviesRouter)
app.use('/api/login', middleware.checkUserAgent, loginRouter)

app.get('*', (_req,res) =>{
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

module.exports = app