const listHelper = require('../utils/list_helper')
const lists = require('./blogLists.js')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(lists.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(lists.blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list returns message', () => {
    expect(listHelper.favoriteBlog([])).toEqual('empty list')
  })

  test('of list with one blog equals the blog', () => {
    const result = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }

    expect(listHelper.favoriteBlog(lists.listWithOneBlog)).toEqual(result)
  })

  test('of list with many blogs equals the blog with most likes', () => {
    const result = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }

    expect(listHelper.favoriteBlog(lists.blogs)).toEqual(result)
  })
})