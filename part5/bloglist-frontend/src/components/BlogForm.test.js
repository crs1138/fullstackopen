import React from 'react'
import BlogForm from './BlogForm'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
    const handleSubmitMock = jest.fn()
    beforeEach(() => {
        render(<BlogForm handleSubmit={handleSubmitMock} />)
    })

    test('Calling the function handling the submit of the form passes on all the form values', async () => {
        const user = userEvent.setup()
        const title = screen.getByLabelText(/title/i)
        const author = screen.getByLabelText(/author/i)
        const url = screen.getByLabelText(/url/i)
        const createButton = screen.getByRole('button', { name: /create/i })

        await user.type(title, 'You dont know JS')
        await user.type(author, 'Kyle Simpson')
        await user.type(url, 'https://youdontknowjs.com')
        await user.click(createButton)

        expect(handleSubmitMock).toHaveBeenCalledWith({
            title: 'You dont know JS',
            author: 'Kyle Simpson',
            url: 'https://youdontknowjs.com',
        })
    })
})

afterEach(cleanup)
