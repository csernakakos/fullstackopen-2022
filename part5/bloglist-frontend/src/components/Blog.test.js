import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blogTitle, blogAuthor', () => {
  const blog = {
    content: 'Component testing is done with react-testing-library',
  }

  const {container} = render(<Blog blog={blog} />);
  const blogTitle = container.querySelector(".blogTitle");
  const blogAuthor = container.querySelector(".blogAuthor");

  expect(blogTitle).toBeDefined();
  expect(blogAuthor).toBeDefined();
})

test('does not render blogURL, blogLikes', () => {
    const blog = {
      content: 'Component testing is done with react-testing-library',
    }
  
    const {container} = render(<Blog blog={blog} />);
    const blogURL = container.querySelector(".blogURL");
    const blogLikes = container.querySelector(".blogLikes");
  
    expect(blogURL).toBeUndefined();
    expect(blogLikes).toBeUndefined();
  })

  test('clicking the button calls event handler once', async () => {
    const blog = {
      content: 'Component testing is done with react-testing-library',
    }
  
    const mockHandler = jest.fn()
  
    render(
      <Blog blog={blog} />
    )
  
    const button = screen.getByText('view')
    userEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })



  test('clicking the Like button twice calls event handler twice', async () => {
    const blog = {
      content: 'Component testing is done with react-testing-library',
    }
  
    const mockHandler = jest.fn()
  
    render(
      <Blog blog={blog} />
    )
  
    const button = screen.getByText('like!')
    userEvent.click(button);
    userEvent.click(button);
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
