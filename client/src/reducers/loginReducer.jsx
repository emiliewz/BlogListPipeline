import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import storageService from '../services/storage'
import { setNotification } from './infoReducer'

import blogService from '../services/blogs'

const initialState = null

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return initialState
    }
  }
})

export const { set, clear } = loginSlice.actions

export const initializeLogin = () => {
  return async dispatch => {
    const loadedUser = storageService.loadUser()

    if (loadedUser) {
      blogService.setToken(loadedUser.token)
      dispatch(set(loadedUser))
    }
  }
}

export const loginWith = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      storageService.saveUser(user)
      blogService.setToken(user.token)
      dispatch(set(user))
    } catch (e) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(set(null))
  }
}

export default loginSlice.reducer