import { createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        clearNotification(state, action) {
            return null;
        }
    },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export const clearNotificationAfter = ( timeInMs, dispatch ) => {
    setTimeout(() => {
        dispatch(clearNotification())
    }, timeInMs)
}
export default notificationSlice.reducer