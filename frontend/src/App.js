import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import noteService from "./services/notes";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

function App() {
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState("");

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
    });
  };

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
    // });
    noteService.update(id, changedNote).then((response) => {
      setNotes(notes.map((note) => (note.id !== id ? note : response)));
    });
  };

  console.log("render", notes.length, "notes");

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        );
      })}
      <form onSubmit={(e) => addNote(e)}>
        <label htmlFor="note-content">New note:</label>
        <input
          type="text"
          id="note-content"
          onChange={(e) => setNewNoteContent(e.target.value)}
        />
        <button type="submit">Add note</button>
      </form>
    </div>
  );
}

export default App;
