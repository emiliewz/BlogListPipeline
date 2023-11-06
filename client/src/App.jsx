import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLogin } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import Blog from './components/Blog'
import { Container, Nav, Navbar } from 'react-bootstrap'
import NewBlog from './components/NewBlog'

const App = () => {
  const dispatch = useDispatch()
  const loggedin = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeLogin())
  }, [])

  const singleUser = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null

  const singleBlog = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  return (
    <div className='container'>
      <Notification />

      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand as={Link} to='/'>Blog App</Navbar.Brand>

          <Navbar.Toggle aria-controls='responsive-navbar-nav' />

          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>

              <Nav.Link as={Link} to='/'>
                blogs
              </Nav.Link>

              <Nav.Link as={Link} to={loggedin ? '/users' : '/login'}>
                users
              </Nav.Link>

              <Nav.Link href='#' as='span'>
                {!loggedin && <Link to='/login'>login</Link>}
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>

          {loggedin &&
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: {loggedin.name} <LogoutForm />
              </Navbar.Text>
            </Navbar.Collapse>}

        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs/:id' element={<Blog blog={singleBlog} />} />
        <Route path='/blogs/create' element={<NewBlog />} />

        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<User user={singleUser} />} />

        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
