import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'today is a sunny day',
    author: 'Emilie',
    url: 'localhost: 3157',
    likes: 2
  }

  const likeHandler = jest.fn()

  beforeEach(() => {
    render(
      <Blog blog={blog} remove={jest.fn()} canRemove={true} like={likeHandler} />
    )
  })

  test('<Blog /> renders only title and author by default', () => {
    expect(screen.getByText(blog.title, { exact: false })).toBeDefined()
    screen.getByText(blog.author, { exact: false })

    expect(screen.queryByText(blog.url, { exact: false })).toBeNull()
    expect(screen.queryByText('likes', { exact: false })).toBeNull()
  })

  test('renders also details when asked to be shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    screen.getByText(blog.url, { exact: false })
    screen.getByText(`likes ${blog.likes}`, { exact: false })
  })

  test('if liked twice, <Blog /> calls onClick twice', async () => {
    const user = userEvent.setup()

    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
