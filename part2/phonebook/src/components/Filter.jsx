const Filter = ({ name, filterByName }) => (
    <div>
        <label htmlFor="">Filter by name: </label>
        <input
            type="text"
            name="nameFilter"
            id="nameFilter"
            value={name}
            onChange={filterByName}
        />
    </div>
)

export default Filter
