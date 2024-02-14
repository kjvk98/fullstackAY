import { useState, useEffect } from 'react'
import ShowBlogs from './components/Blog'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const logoutForm = () => {
    if(user){
      return(
        <div>
          <p>{user.name} logged in</p>
          <form onSubmit={handleLogout}>
            <button type="submit">logout</button>
          </form>
        </div>
      )
    }
    return(<></>)

  }


  const loginForm = () => {
    if (!user){
      return(
        <>
          <LoginForm
            username={username}
            password={password}
            handleUserNameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </>
      )
    }else {
      <></>
    }

  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={infoMessage} />
      <Error message={errorMessage} />
      {loginForm()}
      {logoutForm()}

      {user &&
        <>
          <BlogForm setError={(text) => setErrorMessage(text)} setInfo={(text) => setInfoMessage(text)}/>
          <ShowBlogs />
        </>
      }
    </div>

  )
}



export default App