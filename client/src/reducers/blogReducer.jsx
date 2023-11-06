import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      const blog = action.payload
      return state.concat(blog)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateOne(state, action) {
      const blog = action.payload
      return state.map(b =>
        b.id !== blog.id ? b : blog)
    },
    removeOne(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    }
  }
})

export const { appendBlog, setBlogs, updateOne, removeOne } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const createdBlog = await blogService.createNew(blog)
    dispatch(appendBlog(createdBlog))
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    dispatch(updateOne(updatedBlog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeOne(id))
  }
}

export const commentBlog = (comment, blog) => {
  return async dispatch => {
    const commentedBlog = await blogService.commentOn(comment, blog.id)
    dispatch(updateOne(commentedBlog))
  }
}

export default blogSlice.reducer

