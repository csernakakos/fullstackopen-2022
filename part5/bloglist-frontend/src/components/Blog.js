
import {useState} from "react";
import { PUT_blog, DELETE_blog } from "../services/blogs";

const Blog = ({blog, blogs, setBlogs, setUpdatedBlogs, user}) => {

  const [showDetails, setShowDetails] = useState(false);

  const increaseLikes = async () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}

    try {
      await PUT_blog(updatedBlog);
    } catch (err) {console.log(err)}

    setUpdatedBlogs(true);
    // setBlogs(blogs);
  }

  const isBlogCreatedByCurrentUser = () => {
    return blog.user[0].username === user.username;
  }


  const deleteBlog = async () => {
    const result = window.confirm(`
      Are you sure you want to remove this blog post:
      ${blog.title}, posted by: ${blog.author}?
      
    `);
    if (result) {
      try {
        // console.log(blog, "<<<<BLOG");
        await DELETE_blog(blog);
        setUpdatedBlogs(true);
      } catch (err) {console.log(err)}
    } else {
      return;
    }
  }


  return (
    <div>
      <div>
        <span className="blogTitle">{blog.title}</span>
        |
        <span className="blogAuthor">{blog.author}</span>
      {showDetails
        ? <button onClick={() => {setShowDetails(false)}}>hide</button>
        : <button className="showDetailsBtn" onClick={() => {setShowDetails(true)}}>view</button>
      }
      </div>
      {showDetails && 
      <div>
        <p className="blogURL">{blog.url}</p>
        <p className="blogLikes">Likes: {blog.likes}</p> <button onClick={increaseLikes}>like!</button>
        <p>{blog.user[0].username}</p>
        {isBlogCreatedByCurrentUser && <button onClick={deleteBlog}>delete</button>}
      </div>
      }
    </div>  
  )
}

export default Blog