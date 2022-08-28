import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
    const dispatch = useDispatch()

    const filterSelected = (value) => {
        console.log(value)
        dispatch(filterChange(value))
    }

    return (
        <div>
            <input
                type="radio"
                name="filter"
                id="all"
                onChange={() => filterSelected('ALL')}
            />
            <label htmlFor="all">all</label>{' '}
            <input
                type="radio"
                name="filter"
                id="important"
                onChange={() => filterSelected('IMPORTANT')}
            />
            <label htmlFor="important">important</label>{' '}
            <input
                type="radio"
                name="filter"
                id="non-important"
                onChange={() => filterSelected('NON_IMPORTANT')}
            />
            <label htmlFor="non-important">non-important</label>
        </div>
    )
}

export default VisibilityFilter
