import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const loggedin = useSelector(state => state.login)

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <>
      <h2>Blogs</h2>

      {loggedin && <Button as={Link} to='/blogs/create' variant='info' >create new</Button>}

      <Table striped>
        <tbody>
          {[...blogs].sort(byLikes).map(blog => (
            <tr key={blog.id}>
              <td>
                <Link className='text-decoration-none' to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList