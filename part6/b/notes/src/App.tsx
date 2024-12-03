// @ts-nocheck
import { toggleImportanceOf } from "./noteReducer";
import { useDispatch, useSelector } from "react-redux";
import NewNote from "./NewNote";
import Notes from "./Notes";
import Filter from "./Filter";

const App = () => {
  return (
    <div>
      <NewNote />
      <Filter />
      <Notes />
    </div>
  );
};

export default App;
