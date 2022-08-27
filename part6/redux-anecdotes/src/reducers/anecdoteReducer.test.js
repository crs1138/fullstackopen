import reducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
    test('user can vote', () => {
        const state = [
            {
                content: 'testing text',
                id: 1,
                votes: 0,
            },
            {
                content: 'second testing anecdote',
                id: 2,
                votes: 0,
            },
        ]
        const action = {
            type: 'VOTE',
            data: { id: 1 },
        }

        deepFreeze(state)
        const newState = reducer(state, action)
        expect(newState).toContainEqual({
            content: 'testing text',
            id: 1,
            votes: 1,
        })
    })
})
