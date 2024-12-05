import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeNotes } from "./redux/noteReducer";
import NewNote from "./NewNote";
import Notes from "./Notes";
import Filter from "./Filter";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-expect-error "We rock in JS, TS requires further tweaks"
    dispatch(initializeNotes());
  }, []);
  return (
    <div>
      <NewNote />
      <Filter />
      <Notes />
    </div>
  );
};

export default App;
