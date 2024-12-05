import { useDispatch } from "react-redux";
import { createNote } from "./redux/noteReducer";
import NoteService from "../services/notes";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (eve) => {
    eve.preventDefault();
    const content = eve.target.note.value;
    eve.target.note.value = "";
    const newNote = await NoteService.createNew(content);
    dispatch(createNote(newNote));
  };

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" />
      <button type="submit">Add note</button>
    </form>
  );
};

export default NewNote;
