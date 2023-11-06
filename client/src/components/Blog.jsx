import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/infoReducer'
import { removeBlog, updateBlog, commentBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form, ListGroup, ListGroupItem } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const loggedin = useSelector(state => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) return null

  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog.id))
        dispatch(setNotification(`The blog' ${blog.title}' by '${blog.author} removed`))
        navigate('/')
      } catch (exception) {
        dispatch(setNotification('error deleting', 'error'))
      }
    }
  }

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(updateBlog(blogToUpdate))
      dispatch(setNotification(`A like for the blog '${blog.title}' by '${blog.author}'`))
    } catch (exception) {
      dispatch(setNotification('error liking', 'error'))
    }
  }

  const canRemove = loggedin && blog.user.username === loggedin.username

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value

    try {
      dispatch(commentBlog(comment, blog))
      dispatch(setNotification(`a new comment ${comment} added`))
    } catch (exception) {
      dispatch(setNotification('error commenting', 'error'))
    }
    event.target.comment.value = ''
  }

  return (
    <Card>
      <Card.Body>
        <h2 className='mt-3 mb-5'>{blog.title}</h2>

        <Card.Text>
          <Card.Link className='text-decoration-none mb-2' href={blog.url}>
            {blog.url}
          </Card.Link>
        </Card.Text>

        <Card.Text>
          {blog.likes} likes {loggedin && <button onClick={() => like(blog)}>like</button>}
        </Card.Text>

        <Card.Text>added by {blog.user.name}</Card.Text>

        {canRemove &&
          <button onClick={() => remove(blog)}>delete</button>
        }

        <h3 className='mt-5'>comments</h3>

        {loggedin && <Form onSubmit={handleComment}>
          <Form.Group>
            <Form.Control
              type='text'
              name='comment'
            />
            <Button className='mt-2' variant='secondary' type='submit'>add comment</Button>
          </Form.Group>
        </Form>}

        <ListGroup className='mt-3'>
          {blog.comments.map((c, i) =>
            <ListGroupItem variant="dark" key={i}>{c}</ListGroupItem>)
          }
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Blog