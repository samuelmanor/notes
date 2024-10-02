import { createNote, toggleImportanceOf } from "../reducers/noteReducer";
import { useDispatch, useSelector } from "react-redux";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

const Note = ({ note, handleClick }) => {
  return (
    <li>
      <p>{note.content}</p>
      <button onClick={handleClick}>
        {note.important ? "important" : "not important"}
      </button>
    </li>
  );
};

function NotesRedux() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <NewNote />
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleClick={() => dispatch(toggleImportanceOf(note.id))}
          />
        ))}
      </ul>
    </div>
  );
}

export default NotesRedux;
