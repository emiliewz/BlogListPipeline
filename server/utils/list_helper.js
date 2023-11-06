var _ = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined

  const { title, author, url, likes } = blogs.reduce((a, b) => a.likes >= b.likes ? a : b)
  // const { title, author, url, likes } = blogs.sort((b1, b2) => b2.likes - b1.likes)[0]

  return { title, author, url, likes }
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) return undefined

  // group blogs by author
  const blogsByAuthor = _.groupBy(blogs, (blog) => blog.author)
  // const totalBlogs = _.groupBy(blogs, _.iteratee('author'))

  // convert object to array and compare elements array's length, to get the array of most blogs
  // const most = _.values(blogsByAuthor).reduce((a, b) => a.length >= b.length ? a : b)
  const most = _.values(blogsByAuthor).reduce((a, b) => a.length >= b.length ? a : b)

  // return a new object containing blogs length and author's name
  return { author: most[0]['author'], blogs: most.length }

  // const authorBlogs = Object.entries(blogsByAuthor).reduce((array, [author, blogList]) => {
  //   return array.concat({
  //     author,
  //     blogs: blogList.length
  //   })
  // }, [])

  // return authorBlogs.sort((e1, e2) => e2.blogs - e1.blogs)[0]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const blogsByAuthor = _.groupBy(blogs, _.iteratee('author'))
  // const blogsByAuthor = groupBy(blogs, (blog) => blog.author)

  const totalLikes = _.values(blogsByAuthor).map(a => a.length === 1
    ? { author: a[0].author, likes: a[0].likes }
    : { author: a[0].author, likes: a.reduce((b, c) => b + c.likes, 0) }
  )

  const result = totalLikes.reduce((a, b) => a.likes >= b.likes ? a : b)

  return result

  // const authorBlogs = Object.entries(blogsByAuthor).reduce((array, [author, blogList]) => {
  //   return array.concat({
  //     author,
  //     likes: blogList.reduce((sum, blog) => sum + blog.likes, 0)
  //   })
  // }, [])

  // return authorBlogs.sort((e1, e2) => e2.likes - e1.likes)[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}