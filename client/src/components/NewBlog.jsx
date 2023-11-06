import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/infoReducer'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NewBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value
      }
      dispatch(createBlog(blog))
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`))
    } catch (exception) {
      dispatch(setNotification('error adding', 'error'))
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    navigate('/')
  }

  return (
    <>
      <h4>Create a new blog</h4>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id='blog-title'
            placeholder='title'
            name='title'
            type='text'
          />

          <Form.Label>author:</Form.Label>
          <Form.Control
            id='blog-author'
            placeholder='author'
            name='author'
            type='text'
          />

          <Form.Label>url:</Form.Label>
          <Form.Control
            id='blog-url'
            placeholder='url'
            name='url'
            type='text'
          />
          <Button variant='primary' type='submit'>create</Button>
        </Form.Group>
      </Form>
    </ >
  )
}

export default NewBlog
