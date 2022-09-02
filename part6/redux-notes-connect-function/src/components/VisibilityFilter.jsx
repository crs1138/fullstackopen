import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {
    return (
        <div>
            <input
                type="radio"
                name="filter"
                id="all"
                onChange={() => props.filterChange('ALL')}
            />
            <label htmlFor="all">all</label>{' '}
            <input
                type="radio"
                name="filter"
                id="important"
                onChange={() => props.filterChange('IMPORTANT')}
            />
            <label htmlFor="important">important</label>{' '}
            <input
                type="radio"
                name="filter"
                id="non-important"
                onChange={() => props.filterChange('NON_IMPORTANT')}
            />
            <label htmlFor="non-important">non-important</label>
        </div>
    )
}

const mapDispatchToProps = {
    filterChange,
}

const ConnectedVisibilityFilter = connect(
    null,
    mapDispatchToProps
)(VisibilityFilter)
export default ConnectedVisibilityFilter
