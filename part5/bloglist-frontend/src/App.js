import React, { useState, useEffect } from 'react'
import BlogList from "./components/BlogList";
import CreateBlog from "./components/CreateBlog";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import LoginDetails from "./components/LoginDetails";
import {setToken, GET_all_blogs} from './services/blogs'
import {POST_login} from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  // get login details from localStorage
  useEffect(() => {
    let userJSON;
    userJSON = JSON.parse(window.localStorage.getItem("BlogUser"));


    if (userJSON) {
      const user = userJSON;
      setUser(userJSON);
      setToken(user.token);
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await POST_login({username, password});


      setUser(user);
      setToken(user.token);
      setUsername("");
      setPassword("");

      window.localStorage.setItem("BlogUser", JSON.stringify(user))

    } catch (err) {
      setErrorMessage("This user does not exist, or the username or password is wrong.")
      setTimeout(() => {setErrorMessage(null)}, 5000)
    };
  }

  useEffect(() => {
    GET_all_blogs().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  return (
    <div>

      {errorMessage &&
      <Notification message={errorMessage}/>
      }

      {successMessage &&
      <Notification message={successMessage}/>
      }

      {!user && 
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      }

      {user &&
      <>
        <LoginDetails 
          name={user.name}
        />
        <Logout />

        <BlogList
          blogs={blogs}
        />


        <CreateBlog
            setBlogs={setBlogs}
            blogs={blogs}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
        />
      </>
      }


    </div>
  )
}

export default App