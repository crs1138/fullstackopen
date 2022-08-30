import { useDispatch, useSelector } from 'react-redux'
import { set } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const filterValue = useSelector((state) => state.filter)

    const style = {
        marginBottom: 10,
    }

    const handleChange = (eve) => {
        eve.preventDefault()
        dispatch(set(eve.target.value))
    }
    return (
        <div style={style}>
            <label htmlFor="filter">Filter: </label>
            <input type="text" value={filterValue} onChange={handleChange} />
        </div>
    )
}

export default Filter
