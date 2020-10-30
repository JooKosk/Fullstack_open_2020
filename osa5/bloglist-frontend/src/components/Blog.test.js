import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('blog renders initially displaying title and author', () => {
  const blog = {
    title: 'The wonders of blogging',
    author: 'Wolter Miletyz',
    url: 'jabaduu.com/theWonders',
    likes: 0,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }

  const user = { name : 'Matti Luukkainen' }

  const component = render(
    <Blog blog = {blog} user = {user} />
  )

  const div = component.container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'The wonders of blogging'
  )

  expect(div).toHaveTextContent(
    'Wolter Miletyz'
  )
  expect(div).not.toHaveTextContent('jabaduu.com/theWonders')
  expect(div).not.toHaveTextContent('likes')
})

test('all blog info is rendered when view button has been pressed', async () => {
  const blog = {
    title: 'The wonders of blogging',
    author: 'Wolter Miletyz',
    url: 'jabaduu.com/theWonders',
    likes: 0,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }

  const user = { name : 'Matti Luukkainen' }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  component.debug()

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogAllInfo')
  expect(div).toHaveTextContent(
    'The wonders of blogging'
  )

  expect(div).toHaveTextContent(
    'Wolter Miletyz'
  )
  expect(div).toHaveTextContent('jabaduu.com/theWonders')
  expect(div).toHaveTextContent('likes')
})

test('if like button is pressed twice, event handler is called twice', async () => {
  const blog = {
    title: 'The wonders of blogging',
    author: 'Wolter Miletyz',
    url: 'jabaduu.com/theWonders',
    likes: 0,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }

  const user = { name : 'Matti Luukkainen' }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  component.debug()

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  component.debug()

  const likeButton = component.getByText('like')
  likeButton.onclick = () => mockHandler()
  fireEvent.click=(likeButton)
  fireEvent.click=(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
