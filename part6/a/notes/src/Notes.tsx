import {} from "react-redux";
import { useAppDispatch, useAppSelector, type State } from "./redux/store";
import { toggleImportanceOf } from "./noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li key={note.id} onClick={handleClick}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state: State) => state);
  const handleClick = (id) => {
    dispatch(toggleImportanceOf(id));
  };
  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => handleClick(note.id)}
        />
      ))}
    </ul>
  );
};

export default Notes;
