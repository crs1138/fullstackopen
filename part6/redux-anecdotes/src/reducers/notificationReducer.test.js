import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
    const state = 'This is the default notification message'
    test('set content in the notification store', () => {
        const action = {
            type: 'notifications/setNotification',
            payload: 'This is the new notification',
        }

        deepFreeze(state)
        const newState = notificationReducer(state, action)
        expect(newState).toBe('This is the new notification')
    })

    test('remove content in the notification store', () => {
        const action = {
            type: 'notifications/removeNotification',
        }

        deepFreeze(state)
        const newState = notificationReducer(state, action)
        expect(newState).toBe(null)
    })
})
