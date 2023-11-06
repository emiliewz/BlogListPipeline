import { loginWith } from '../reducers/loginReducer'
import { setNotification } from '../reducers/infoReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value
      }
      dispatch(loginWith(credentials))
      dispatch(setNotification('Welcome!'))
      navigate('/')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            id='username'
            name='username'
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            type='password'
            id='password'
            name='password'
          />

          <Button id='login-button' type='submit' variant='primary'>
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
