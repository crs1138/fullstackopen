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
export default notificationSlice.reducer
