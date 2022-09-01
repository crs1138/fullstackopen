import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
    test('returns new state with action `notes/setNotes`', () => {
        const state = []
        const action = {
            type: 'notes/setNotes',
            payload: [
                {
                    content: 'the app state is in redux store',
                    important: true,
                    id: 1,
                },
            ],
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toEqual(action.payload)
    })

    test('returns new state with action `notes/toggleImportanceOf`', () => {
        const state = [
            {
                content: 'the app state is in redux store',
                important: true,
                id: 1,
            },
            {
                content: 'state changes are made with actions',
                important: false,
                id: 2,
            },
        ]

        const action = {
            type: 'notes/toggleImportanceOf',
            payload: state[1],
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(state[0])

        expect(newState).toContainEqual({
            content: 'state changes are made with actions',
            important: true,
            id: 2,
        })
    })
})
