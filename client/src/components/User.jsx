import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <Table striped>
        <tbody>
          {user.blogs.map((b, i) => (
            <tr key={b.id}>
              <td>
                <Link className='text-decoration-none' to={`/blogs/${b.id}`}>
                  {i + 1}. {b.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div >
  )
}

export default User