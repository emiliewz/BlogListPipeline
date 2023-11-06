import loginService from '../services/login'
import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    }
  }
})

export const { setLogin } = loginSlice.actions

export const initializeLogin = () => {
  return async dispatch => {
    const loadedUser = storageService.loadUser()

    if (loadedUser) {
      blogService.setToken(loadedUser.token)
      dispatch(setLogin(loadedUser))
    }
  }
}

export const loginWith = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    storageService.saveUser(user)
    blogService.setToken(user.token)
    dispatch(setLogin(user))
  }
}

export const logout = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(setLogin(null))
  }
}

export default loginSlice.reducer