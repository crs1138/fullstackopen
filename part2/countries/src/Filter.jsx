const Filter = ({ value, onChange }) => (
    <div>
        <label htmlFor="filter">Find countries: </label>
        <input name="filter" id="filter" value={value} onChange={onChange} />
    </div>
)

export default Filter
