import { filterChange } from "../reducers/filterReducer";
import {
  createNote,
  toggleImportanceOf,
  setNotes,
} from "../reducers/noteReducer";
import { useDispatch, useSelector } from "react-redux";
import noteService from "../services/notes";
import { useEffect } from "react";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    // dispatch(createNote(content));
    const newNote = await noteService.createNew(content);
    dispatch(createNote(newNote));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

const Note = ({ note }) => {
  const dispatch = useDispatch();

  const toggleImportance = async () => {
    await noteService.update(note.id, {
      ...note,
      important: !note.important,
    });
    dispatch(toggleImportanceOf(note.id));
  };

  return (
    <li>
      <p>{note.content}</p>
      <button onClick={() => toggleImportance()}>
        {note.important ? "important" : "not important"}
      </button>
    </li>
  );
};

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
      />
      <br />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      <br />
      not important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("NOTIMPORTANT"))}
      />
    </div>
  );
};

function NotesRedux() {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  });

  const notes = useSelector((state) => {
    if (state.filter.view === "ALL") {
      return state.notes;
    }
    return state.filter.view === "IMPORTANT"
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important);
  });

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
}

export default NotesRedux;
