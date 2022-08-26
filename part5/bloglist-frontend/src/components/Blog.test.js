import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    const blogMock = {
        author: 'Swyx',
        id: '630612466895644aa3f96ff',
        likes: 5,
        title: 'This is yet another blog',
        url: 'https://emmaplunkett.art/',
        user: {
            id: '62ffc8ed512a5db801bd48f4',
            name: 'Super User',
            username: 'root',
        },
    }
    const handleLikeMock = jest.fn()
    const handleRemoveMock = jest.fn()
    const loggedInUserMock = 'root'

    beforeEach(() => {
        render(
            <Blog
                blog={blogMock}
                handleLike={handleLikeMock}
                handleRemove={handleRemoveMock}
                loggedInUser={loggedInUserMock}
            />
        )
    })

    test('By default the component shows title and author but not url or likes', () => {
        const title = screen.getByText(/this is yet another blog/i)
        expect(title).toBeVisible()

        const author = screen.getByText(/swyx/i)
        expect(author).toBeVisible()

        const url = screen.queryByText(/emmaplunkett\.art/i)
        expect(url).not.toBeInTheDocument()

        const likes = screen.queryByText(/likes/i)
        expect(likes).not.toBeInTheDocument()
    })

    test('Show URL and likes after user click `view` button', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByRole('button', {
            name: /view/i,
            exact: false,
        })
        await user.click(viewButton)

        const url = screen.getByText(/emmaplunkett\.art/i)
        expect(url).toBeVisible()

        const likes = screen.getByText(/likes\s5/i)
        expect(likes).toBeVisible()
    })

    test('If the like button is clicked 2x, its handler is called 2x', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByRole('button', { name: /view/i })
        await user.click(viewButton)

        const likeButton = screen.getByRole('button', { name: /like/i })
        await user.click(likeButton)
        await user.click(likeButton)

        expect(handleLikeMock).toHaveBeenCalledTimes(2)
    })

    afterEach(cleanup)
})
