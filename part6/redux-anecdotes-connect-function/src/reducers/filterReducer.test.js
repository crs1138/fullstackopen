import deepFreeze from 'deep-freeze'
import filterReducer from './filterReducer'

describe('filterReducer', () => {
    test('set filter state in the store', () => {
        const state = ''
        const action = {
            type: 'filter/set',
            payload: 'new filter string',
        }
        deepFreeze(state)
        const newState = filterReducer(state, action)
        expect(newState).toBe(action.payload)
    })
})
