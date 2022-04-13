import PropTypes from 'prop-types';
import {POST_blog} from '../services/blogs'
import {useState} from "react";

export default function CreateBlog({
    setBlogs,
    setUpdatedBlogs,
    blogs,
    setSuccessMessage,
    setErrorMessage,
}) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [newNoteClicked, setNewNoteClicked] = useState(false);

    const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
    // build object out of user input title, author, url
    const newBlog = {
      title,
      author,
      url,
    }
    
    // send POST request
    await POST_blog(newBlog);

    // reset fields
    setTitle("");
    setAuthor("");
    setUrl("");
    
    // setBlogs
    setBlogs(blogs);
    setUpdatedBlogs(true);

    // seStatusMessage
    setSuccessMessage("New blog added! :)");
    setTimeout(() => {setSuccessMessage(null)}, 5000);

    setNewNoteClicked(false);

    } catch (err) {
      setErrorMessage("Uh-oh. Something went wrong. :(")
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

    return (
        <>
        {!newNoteClicked && <button onClick={() => {setNewNoteClicked(true)}}>new note</button>}
        {newNoteClicked && 
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>

                title:
                <input 
                    onChange={({target}) => {setTitle(target.value)}} 
                    value={title}
                    name="title"
                    type="text"
                    required
                />

                author:
                <input 
                    onChange={({target}) => {setAuthor(target.value)}} 
                    value={author}
                    name="url"
                    type="text"
                    required
                />

                url:
                <input 
                    onChange={({target}) => {setUrl(target.value)}} 
                    value={url}
                    name="url"
                    type="text"
                    required
                />

                
                <button>Add blog</button>
                <button onClick={() => {setNewNoteClicked(false)}}>Cancel</button>
            </form>
        
      </div>
        }
        </>
    )
}

CreateBlog.propTypes = {
    setBlogs: PropTypes.func.isRequired,
    setUpdatedBlogs: PropTypes.func.isRequired,
    // blogs: PropTypes.func.isRequired,
    setSuccessMessage: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
}