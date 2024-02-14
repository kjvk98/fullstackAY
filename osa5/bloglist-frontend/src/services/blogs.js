import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (title, author, url) => {
  const config = {
    headers: { Authorization: token },
  }
  const newObject = {
    title: title,
    author: author,
    url: url
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLike = async (user_id, title, author, url, likes, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const updatedObject = {
    title: title,
    author: author,
    user: user_id,
    url: url,
    likes: likes+1
  }

  const desUrl = `${baseUrl}/${id}`

  const response = await axios.put(desUrl, updatedObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const desUrl = `${baseUrl}/${id}`
  const response = await axios.delete(desUrl, config)
  return response.data
}

export default { getAll, addBlog, setToken, updateLike, deleteBlog }