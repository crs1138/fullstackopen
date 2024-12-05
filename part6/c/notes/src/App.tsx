import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NoteService from "../services/notes";
import { setNotes } from "./redux/noteReducer";
import NewNote from "./NewNote";
import Notes from "./Notes";
import Filter from "./Filter";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function populateStoreWithNores() {
      try {
        const notes = await NoteService.getAll();
        dispatch(setNotes(notes));
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    })();
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
