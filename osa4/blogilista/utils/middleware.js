const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: 'token missing or invalid' })
    }
  
    next(error)
  }

  /*
  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if(authorization && authorization.startsWith('Bearer ')){
      request.token = authorization.replace('Bearer ', '')
    }

    next()
  }
*/

  const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
      const decodedToken = jwt.verify(authorization.replace('Bearer ', ''), process.env.SECRET)
      const user = await User.findById(decodedToken.id)
      request.user = user
    }
    /*
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id)
      request.user = user
      //return response.status(401).json({ error: 'token invalid' })
    }
    */

    next()
  }

  module.exports = {
    errorHandler,
    userExtractor
  }