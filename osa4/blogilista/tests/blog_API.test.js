const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const lists = require('./blogLists.js')

const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(lists.blogs[0])
  await blogObject.save()
  blogObject = new Blog(lists.blogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
  
    expect(title).toContain(
        'Go To Statement Considered Harmful'
    )
  })

test('blogs have id', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body.map(r => r.id)
    expect(id).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
})