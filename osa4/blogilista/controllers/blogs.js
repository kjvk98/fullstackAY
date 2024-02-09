const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const user = request.user
    if(!user){
      return response.status(401).json({ error: 'token invalid' })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id 
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  })

  blogsRouter.delete('/:id', async (request, response) => {    

    if(!request.user){
      return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() === request.user._id.toString()){
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).json({
      error: 'wrong user'
      })
    }

  })


  blogsRouter.put('/:id', async (request, response) => {
    const amount = Number(request.body.likes)

    const updated = await Blog.findByIdAndUpdate(request.params.id, {likes: amount}, { new: true})
    console.log(updated)
    response.status(201).json(updated)

  })

module.exports = blogsRouter