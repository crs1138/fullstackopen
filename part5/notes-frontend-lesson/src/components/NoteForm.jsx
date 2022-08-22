const NoteForm = ({ addNote, onNoteChange, onFocus, note }) => (
    <form onSubmit={addNote}>
        <input
            type="text"
            onChange={onNoteChange}
            value={note}
            onFocus={onFocus}
        />
        <button type="submit">save</button>
    </form>
)
export default NoteForm
