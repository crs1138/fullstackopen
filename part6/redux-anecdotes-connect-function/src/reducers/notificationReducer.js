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
        removeNotification(state, action) {
            return null
        },
    },
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const showNotification = (message, timeout) => {
    return async (dispatch) => {
        dispatch(setNotification(message))
        await setTimeout(() => {
            dispatch(removeNotification())
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer
