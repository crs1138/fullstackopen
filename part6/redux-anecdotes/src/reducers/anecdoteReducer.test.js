import reducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
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
    test('user can vote', () => {
        const action = {
            type: 'anecdotes/incrementVote',
            payload: 1,
        }

        deepFreeze(state)
        const newState = reducer(state, action)
        expect(newState).toContainEqual({
            content: 'testing text',
            id: 1,
            votes: 1,
        })
    })

    test('create a new vote', () => {
        const action = {
            type: 'anecdotes/createAnecdote',
            payload: { id: 3, content: 'new anecdote' },
        }
        deepFreeze(state)
        const newState = reducer(state, action)
        expect(newState).toContainEqual({
            content: 'new anecdote',
            id: 3,
            votes: 0,
        })
        expect(newState.length).toBe(state.length + 1)
    })
})
