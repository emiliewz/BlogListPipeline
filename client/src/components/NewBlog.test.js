import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NewBlog from './NewBlog'

describe('NewBlog', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createHandler = jest.fn()

    render(<NewBlog createBlog={createHandler} />)

    const input = {
      title: 'this is a happy day',
      author: 'Zhang',
      url: 'localhost:5173'
    }

    const user = userEvent.setup()

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    const showButton = screen.getByText('create')

    await user.type(title, input.title)
    await user.type(author, input.author)
    await user.type(url, input.url)
    await user.click(showButton)

    const calls = createHandler.mock.calls

    expect(calls).toHaveLength(1)
    expect(calls[0][0]).toEqual(input)
  })
})