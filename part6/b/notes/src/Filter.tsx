import { useAppDispatch, useAppSelector } from "./redux/store";
import { filterChange } from "./redux/filterReducer";
const Filter = () => {
  const dispatch = useAppDispatch();
  const filterSelected = (value) => {
    dispatch(filterChange(value));
  };
  const activeFilter = useAppSelector((state) => state.filter);

  return (
    <div>
      <label style={{ marginRight: "12px" }}>
        all{" "}
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("ALL")}
          checked={activeFilter === "ALL"}
        />
      </label>
      <label style={{ marginRight: "12px" }}>
        important{" "}
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("IMPORTANT")}
          checked={activeFilter === "IMPORTANT"}
        />
      </label>
      <label style={{ marginRight: "12px" }}>
        non-important{" "}
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("NONIMPORTANT")}
          checked={activeFilter === "NONIMPORTANT"}
        />
      </label>
    </div>
  );
};
export default Filter;
