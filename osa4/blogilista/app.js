const config = require('./utils/config.js')
const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')


const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)


app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use(middleware.errorHandler)

module.exports = app