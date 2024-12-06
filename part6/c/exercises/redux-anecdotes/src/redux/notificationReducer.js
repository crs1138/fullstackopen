import { createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
    },
})

export const { setNotification } = notificationSlice.actions
export const showNotification = ( message, timeInS ) => dispatch =>{
    dispatch(setNotification(message))
    setTimeout(() => {
        dispatch(setNotification(null))
    }, timeInS * 1000)
}
export default notificationSlice.reducer