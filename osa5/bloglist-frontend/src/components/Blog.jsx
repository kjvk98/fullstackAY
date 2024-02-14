import blogService from '../services/blogs'
import { useState, useEffect } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      await  blogService.updateLike(blog.user.id, blog.title, blog.author, blog.url, blog.likes, blog.id)
      console.log('liking succeeded')
    } catch (exception) {
      console.log('liking failed')
    }
  }

  const handleRemove = async (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      event.preventDefault()
      try{
        await blogService.deleteBlog(blog.id)
        console.log('removing succeeded')
      } catch (exception) {
        console.log('removing failed')
      }
    }
  }


  return(
    <div>
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>show</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
          <div>
            {blog.url}
            <div>
        likes {blog.likes} <button onClick={handleUpdate}>like</button>
            </div>
            <div>
              {blog.user && blog.user.name}
            </div>
            <button onClick={handleRemove}>remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShowBlogs = ({ setInfo, setError }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  })

  return (  <>
    {blogs.sort((b, a) => a.likes - b.likes).map(blog =>
      <Blog key={blog.id} blog={blog}/>
    )}
  </>)
}

export default ShowBlogs