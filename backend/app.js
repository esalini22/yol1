const config = require('./utils/config')
const express = require('express')
require('express-async-errors') //ya no es necesario try and catch y next(exception)
const app = express()
const cors = require('cors')
const scoreRouter = require('./controllers/score')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const path = require('path');

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/score', middleware.checkUserAgent, scoreRouter)
app.use('/api/login', middleware.checkUserAgent, loginRouter)

app.get('*', (_req,res) =>{
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

module.exports = app