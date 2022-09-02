import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            return notification
        },
        removeNotification() {
            return null
        },
    },
})

export const { setNotification, removeNotification } = notificationSlice.actions

let previousTimeoutId
export const showNotification = (message, seconds) => {
    return (dispatch) => {
        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId)
        }

        dispatch(setNotification(message))
        const id = setTimeout(() => {
            dispatch(removeNotification())
        }, seconds * 1000)
        previousTimeoutId = id
    }
}

export default notificationSlice.reducer
