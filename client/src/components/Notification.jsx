import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const info = useSelector(state => state.info)

  if (!(info && info.message)) {
    return null
  }

  return (
    <Alert variant={info.type === 'error' ? 'warning' : 'info'}>
      {info.message}
    </Alert >
  )
}

export default Notification
