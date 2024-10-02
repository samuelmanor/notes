import { useEffect, useState } from "react";
import noteService from "../services/notes";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={() => deleteNote(note.id)}>x</button>
    </li>
  );
};

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // axios.get("http://localhost:3001/notes").then((response) => {
    //   setNotes(response.data);
    // });
    noteService.getAll().then((response) => {
      setNotes(response);
    });
  }, []);

  const addNote = (e) => {
    e.preventDefault();

    const newNote = {
      content: newNoteContent,
      important: Math.random() < 0.5,
    };

    // axios.post("http://localhost:3001/notes", newNote).then((response) => {
    //   console.log(response);
    //   setNotes(notes.concat(response.data));
    //   setNewNoteContent("");
    // });
    noteService.create(newNote).then((response) => {
      setNotes(notes.concat(response));
      setNewNoteContent("");
      setMessage("note added!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    });
  };

  const deleteNote = (id) => {
    noteService.destroy(id).then((response) => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
    // });
    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((note) => (note.id !== id ? note : response)));
      })
      .catch((error) => {
        console.log(error);
        setMessage(`Note '${note.content}' was already removed from server`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  // console.log("render", notes.length, "notes");

  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={message} />
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={deleteNote}
          />
        );
      })}
      <form onSubmit={(e) => addNote(e)}>
        <label htmlFor="note-content">New note:</label>
        <input
          type="text"
          id="note-content"
          onChange={(e) => setNewNoteContent(e.target.value)}
          value={newNoteContent}
        />
        <button type="submit">Add note</button>
      </form>
    </div>
  );
}

export default Notes;
