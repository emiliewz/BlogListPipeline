import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, type: 'info' }

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setInfo(state, action) {
      return action.payload
    }
  }
})

export const { setInfo } = infoSlice.actions

export const setNotification = (message, type = 'info') => {
  return async dispatch => {
    dispatch(setInfo({ message, type }))
    setTimeout(() =>
      dispatch(setInfo(null)), 3000)
  }
}

export default infoSlice.reducer