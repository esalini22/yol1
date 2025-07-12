const config = require('./utils/config')
const express = require('express')
require('express-async-errors') //ya no es necesario try and catch y next(exception)
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const moviesRouter = require('./controllers/movies')
const loginRouter = require('./controllers/login')
const adminRouter = require('./controllers/admin')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
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
app.use('/api/users', middleware.checkUserAgent, usersRouter)
app.use('/api/movies', middleware.checkUserAgent, moviesRouter)
app.use('/api/login', middleware.checkUserAgent, loginRouter)
app.use('/api/admin', middleware.userExtractor, adminRouter)

app.get('*', (_req,res) =>{
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

module.exports = app