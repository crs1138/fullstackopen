import { connect } from 'react-redux'
import { set } from '../reducers/filterReducer'

const Filter = (props) => {
    const filterValue = props.filter

    const style = {
        marginBottom: 10,
    }

    const handleChange = (eve) => {
        eve.preventDefault()
        props.set(eve.target.value)
    }
    return (
        <div style={style}>
            <label htmlFor="filter">Filter: </label>
            <input type="text" value={filterValue} onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    set,
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter
