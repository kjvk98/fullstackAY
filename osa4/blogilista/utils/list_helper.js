const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.length === 0
    ? 0
    : blogs.map(result => result.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return max.likes > blog.likes
      ? max
      : blog
  }

  if (blogs.length === 0){
    return 'empty list'
  } else {
    const result = blogs
    .reduce(reducer)
    delete result.__v
    delete result.url
    delete result._id
    return result
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}