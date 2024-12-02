// @ts-nocheck
import { toggleImportanceOf } from "./noteReducer";
import { useDispatch, useSelector } from "react-redux";
import NewNote from "./NewNote";
import Notes from "./Notes";

const App = () => (
  <div>
    <NewNote />
    <Notes />
  </div>
);

export default App;
