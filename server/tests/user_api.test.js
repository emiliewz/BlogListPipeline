const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

const { usersInDb, initialUsers } = require('./test_helper')

describe('creation of a user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('succeeds with valid username and password', async () => {
    const user = {
      username: 'mluukkai',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await usersInDb()

    expect(users).toHaveLength(initialUsers.length + 1)
    const usernames = await users.map(u => u.username)
    expect(usernames).toContain(user.username)
  })

  test('fails with a proper error if username is too short or missing', async () => {
    let user = {
      username: 'ml',
      password: 'salainen',
    }

    let result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `username` (`ml`) is shorter than the minimum allowed length')

    user = { password: 'salainen' }

    result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `username` is required')
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const user = {
      username: 'root',
      password: 'secret',
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('expected `username` to be unique')
  })

  test('fails with a proper error if password is too short or missing', async () => {
    let user = {
      username: 'mluukka',
      password: 'se',
    }

    let result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`password` is shorter than the minimum allowed length (3)')

    user = { username: 'mluukka' }

    result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`password` is shorter than the minimum allowed length (3)')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})