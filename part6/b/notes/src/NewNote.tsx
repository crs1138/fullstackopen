import { useDispatch } from "react-redux";
import { createNote } from "./redux/noteReducer";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = (eve) => {
    eve.preventDefault();
    const content = eve.target.note.value;
    eve.target.note.value = "";
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" />
      <button type="submit">Add note</button>
    </form>
  );
};

export default NewNote;
