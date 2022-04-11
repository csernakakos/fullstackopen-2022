import { useState, useEffect } from "react";
import noteService from "./services/notes";
import {login} from "./services/login";
import Note from "./components/Note";
import Notification from "./components/Notification";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);


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
    noteObject.important = !(noteObject.important);

    const note = notes.find((note) => {return note.id === id});

    // Update 1 field in 1 object:
    const changedNote = {...note, important: !!note.important};

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : changedNote))
      })
      .catch(error => {
        setErrorMessage("Note already deleted.");

        setTimeout(() => {setErrorMessage(null)}, 5000)
        
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

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handleLogin", username, password);

    try {
      console.log("LOGIN")
      const user = await login({username, password})
      console.log(user);
      setUser({
        user
      });

      setUsername("");
      setPassword("");


    } catch (err) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            onChange={({ target }) => setUsername(target.value)}
            value={username}
            name="Username"
            type="text"
          />

        </div>

        <div>
          password
          <input
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            name="Password"
            type="password"
          />

        </div>

        <button type="submit">Log in</button>

      </form>

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
