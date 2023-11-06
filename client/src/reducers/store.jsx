import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './blogReducer'
import infoReducer from './infoReducer'
import loginReducer from './loginReducer'
import usersReducer from './usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    login: loginReducer,
    info: infoReducer,
    users: usersReducer
  }
})

export default store

