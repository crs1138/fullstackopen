import { createSlice } from '@reduxjs/toolkit'

const initialState = 'ALL'

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action) {
            const filter = action.payload
            return filter
        },
    },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer

// export const filterChange = (filter) => {
//     return {
//         type: 'SET_FILTER',
//         filter,
//     }
// }

// const filterReducer = (state = 'ALL', action) => {
//     console.log('ACTION: ', action)
//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.filter

//         default:
//             return state
//     }
// }

// export default filterReducer
