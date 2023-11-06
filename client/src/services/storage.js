const KEY = 'loggedBlogAppUser'

const saveUser = (user) => localStorage.setItem(KEY, JSON.stringify(user))

const loadUser = () => JSON.parse(window.localStorage.getItem(KEY))

const removeUser = () => localStorage.removeItem(KEY)

export default {
  saveUser,
  loadUser,
  removeUser,
}