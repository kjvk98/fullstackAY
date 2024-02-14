import { useState, useEffect,  useRef, useImperativeHandle, forwardRef } from 'react'
import blogService from '../services/blogs'
import '../index.css'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return{
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <p>{props.text}</p>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

const BlogForm = ({ setError, setInfo }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      await  blogService.addBlog(title, author, url)
      setInfo(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setInfo(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setError('invalid inputs: a blog must have atleast title and url')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }
  return(
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>
          title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div>
          author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={event => setAuthor(event.target.value)}
            />
          </div>
          <div>
          url:
            <input
              type="text"
              value={url}
              name="url"
              onChange={event => setUrl(event.target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>
    </>
  )
}

export default BlogForm