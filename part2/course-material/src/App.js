import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Note from "./components/Note";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
      setNotes([...notes, noteObject]);
      setNewNote("");
    })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  const toggleImportanceOf = (id) => {
    const noteObject = notes[id];
    console.log(noteObject, "<<<")
    noteObject.important = !(noteObject.important);

    const note = notes.find((note) => {return note.id === id});

    // Update 1 field in 1 object:
    const changedNote = {...note, important: !note.important};

    noteService
      .update(id, changedNote)
      .then(returnedNote => {setNotes(notes.map(note => note.id !== id ? note : returnedNote))})
      .catch(error => {
        alert(`note already deleted`);
        setNotes(notes.filter(n => n.id !== id));
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes));
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <div>
          <button
            onClick={() => setShowAll(!showAll)}
          >
            show {showAll ? "important" : "all"}
          </button>
      </div>
      <ul>
        {notesToShow.map((note) =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};
