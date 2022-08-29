import { createSlice } from '@reduxjs/toolkit'

const initialState = 'This is the default notification message'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            return notification
        },
    },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
