import { useDispatch } from 'react-redux'
import { filter } from './redux/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (eve) => {
        const { value } = eve.target
        dispatch(filter(value))
    }
    return (
        <div style={{marginBottom: "12px"}}>
            <label>Filter: <input type="text" name="filter" onChange={handleChange} /></label>
        </div>
    )
}

export default Filter