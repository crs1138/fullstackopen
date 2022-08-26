import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggable from './Toggable'

describe('<Toggable />', () => {
    let container

    beforeEach(() => {
        container = render(
            <Toggable buttonLabel="show...">
                <div className="testDiv">toggable content</div>
            </Toggable>
        )
    })

    test('renders all its children', async () => {
        await screen.findAllByText('toggable content')
    })

    test('at start the children are not displayed', () => {
        const div = container.getByTestId('toggableContent')
        expect(div).not.toBeVisible()
    })

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const div = container.getByTestId('toggableContent')

        expect(div).toBeVisible()
    })

    test('after clicking the button, children are hidden', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const closeButton = screen.getByText('Cancel')
        await user.click(closeButton)

        const div = container.getByTestId('toggableContent')
        expect(div).not.toBeVisible()
    })
})
