import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/infoReducer'
import { logout } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const LogoutForm = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(logout())
    dispatch(setNotification('logged out'))
    navigate('/')
  }

  return (
    <>
      <Button onClick={handleClick} variant='secondary' size='sm'>logout</Button>
    </>
  )
}

export default LogoutForm