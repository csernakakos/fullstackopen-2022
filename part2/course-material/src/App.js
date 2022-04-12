import { useState, useEffect, useRef } from "react";
import noteService from "./services/notes";
import {login} from "./services/login";
import Note from "./components/Note";
import Notification from "./components/Notification";
import NoteForm from "./components/NoteForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false)


  const noteFormRef = useRef();


  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes([...notes, returnedNote]);
        setNewNote("");
    })
  }

  // const handleNoteChange = (e) => {
  //   setNewNote(e.target.value);
  // }

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
  
    try {
      console.log("LOGIN")
      const user = await login({username, password})

      window.localStorage.setItem("NoteAppUser", JSON.stringify(user))


      setUser(user);
      noteService.setToken(user.token);

      setUsername("");
      setPassword("");

    } catch (err) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  useEffect(() => {
    const userJSON = window.localStorage.getItem("NoteAppUser");

    if (user) {
      const user = JSON.parse(userJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
  <div>
    <div style={hideWhenVisible}>
      <button onClick={() => setLoginVisible(true)}>log in</button>
    </div>
    <div style={showWhenVisible}>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
      <button onClick={() => setLoginVisible(false)}>cancel</button>
    </div>
  </div>
  )
}



// App renders this:
return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {/* {!user && loginForm()}
      {user && noteForm()} */}

{user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm
              createNote={addNote}
            />
          </Togglable>
        </div>
      }

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
     
    </div>
  );
}
