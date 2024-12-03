export const filter = (searchTerm) => ({
    type: "FILTER_SEARCH",
    payload: searchTerm
})
export const filterReducer = (state='', action) => {
    console.log('action', action)

    if (action.type === 'FILTER_SEARCH') {
        return  action.payload
    }
    return state
}