const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const lists = require('./blogLists.js')
const bcrypt = require('bcrypt')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(lists.blogs)

  })

describe('when there is initially blogs saved', () => {
    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
  
        expect(response.body).toHaveLength(lists.blogs.length)
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
})
describe('addition of a new blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: "New blog",
            author: "KK",
            url: "https://KKBlog.com/",
            likes: 5
        }

        const user = {
          username: 'root', 
          password: 'sekret'
        }
        const res = await api.post('/api/login')
        .send(user)
        const token ='Bearer ' + res.body.token
        await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ 'Authorization': token})
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
        const response = await api.get('/api/blogs')
  
        const title = response.body.map(r => r.title)
  
        expect(response.body).toHaveLength(lists.blogs.length + 1)
        expect(title).toContain(
          'New blog'
        )
  })
  test('valid blog cannot be added with wrong authorization', async() => {
    const newBlog = {
      title: "newnewblog",
      author: "KK",
      url: "https://Blog.com/",
      likes: 5
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ 'Authorization': 'srh'})
    .expect(401)

  })

  test('a blog without likes have 0 likes', async () => {
    const newBlog = {
            title: "New blog",
            author: "KK",
            url: "https://KKBlog.com/"
    }
    const user = {
      username: 'root', 
      password: 'sekret'
    }
    const res = await api.post('/api/login')
    .send(user)
    const token ='Bearer ' + res.body.token
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ 'Authorization': token})
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const likes = response.body.map(r => r.likes).pop()
  
    expect(response.body).toHaveLength(lists.blogs.length + 1)
    expect(likes).toBe(0)
  })

  test('blog without url or title is not added', async () => {
    const newBlog = {
      title: "New new blog",
      author: "wetgb"
    }
    const newnewBlog = {
        url: "newnewblog.com"
    }
  
    const user = {
      username: 'root', 
      password: 'sekret'
    }
    const res = await api.post('/api/login')
    .send(user)
    const token ='Bearer ' + res.body.token

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ 'Authorization': token})
      .expect(400)
  
    await api 
        .post('/api/blogs')
        .send(newnewBlog)
        .set({ 'Authorization': token})
        .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(lists.blogs.length)
  })
})

describe('deleting blogs', () => {
  test('deleting succeeds with status code 204 if id is valid and correct auth', async () => {

    const newBlog = {
      title: "New blog",
      author: "KK",
      url: "https://KKBlog.com/",
      likes: 5
  }

  const user = {
    username: 'root', 
    password: 'sekret'
  }
  const res = await api.post('/api/login')
  .send(user)
  const token ='Bearer ' + res.body.token
  const blog = await api
  .post('/api/blogs')
  .send(newBlog)
  .set({ 'Authorization': token})

  const id = blog.body.id
    await api
      .delete(`/api/blogs/${id}`)
      .set({'Authorization': token})
      .expect(204)

    const blogsAtEnd = await lists.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      lists.blogs.length
    )

    const title = blogsAtEnd.map(r => r.title)

    expect(title).not.toContain(newBlog.title)
  })

  test('deleting fails if invalid id', async() => {
    const invalidId = '123'
    const user = {
      username: 'root', 
      password: 'sekret'
    }
    const res = await api.post('/api/login')
    .send(user)
    const token ='Bearer ' + res.body.token

    await api
        .delete(`/api/blogs/${invalidId}`)
        .set({'Authorization': token})
        .expect(400)
    
    const blogsAtEnd = await lists.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
        lists.blogs.length
    )
  })

  test('deleting fails with wrong auth', async() => {
    const blogsAtStart = await lists.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(401)

    const blogsAtEnd = await lists.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
        lists.blogs.length
    )
  })

})

describe('updating likes', () => {
    test('updates likes on valid id', async() => {
        const blogsAtStart = await lists.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const blog = {
            likes: blogToUpdate.likes + 3
        }

        await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blog)
                .expect(201)
        
        const blogAtEnd = await lists.blogsInDb()
        const testBlog = blogAtEnd[0]
        expect(testBlog.likes).toBe(blogToUpdate.likes + 3)
    })

    test('does not update with invalid id', async() => {
        const blogsAtStart = await lists.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const blog = {
            likes: blogToUpdate.likes + 3
        }

        const invalidId = '123'
        await api
            .put(`/api/blogs/${invalidId}`)
            .send(blog)
            .expect(400)
        
    })
})

afterAll(async () => {
  await mongoose.connection.close()
})