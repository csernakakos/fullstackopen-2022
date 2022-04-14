import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from "./Note";

test("renders content", () => {
    const note = {
        content: "Component testing is done...",
        important: true,
    }

    // Look for text:
        // render(<Note note={note}/>)
        // const element = screen.getByText("Component testing is done...");
        // expect(element).toBeDefined();

    // Look by CSS class:
        const {container} = render(<Note note={note} />)

        screen.debug()
        screen.debug(container)

        const div = container.querySelector(".note");
        expect(div).toHaveTextContent(
            "Component testing is done..."
        )

})

test('clicking the button calls event handler once', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }
  
    const mockHandler = jest.fn()
  
    render(
      <Note note={note} toggleImportance={mockHandler} />
    )
  
    const button = screen.getByText('make not important')
    userEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(1)
  })