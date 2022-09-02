const Note = ({ note, handleClick }) => (
    <li onClick={handleClick}>
        {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
)

export default Note
