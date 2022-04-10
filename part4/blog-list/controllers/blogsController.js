const Blog = require("../models/blog");

// GET_blogs.rest
const GET_blogs = async (request, response) => {
  console.log("GET_blogs")
    const blogs = await Blog.find({});
    response.json(blogs);
  }

// POST_blog.rest
const POST_blog = async (request, response) => {
    const blog = new Blog(request.body);

    if (!blog.title || !blog.url) {
      response.status(400).end()
    }

    if (!blog.likes) {
      blog.likes = 0;
    }

    const result = await blog.save();
    response.status(201).json(result);
  };

// PUT_blog.rest
const PUT_blog = async (request, response) => {
  const {id} = request.params;
  const {title, author, url, likes} = request.body;

  const updatedBlog = {
    title,
    author,
    url,
    likes
  }
  
    const blog = await Blog.findByIdAndUpdate(id, updatedBlog, {new: true});
    response.json(updatedBlog);
}


// DELETE_blog.rest
const DELETE_blog = async (request, response) => {
  const {id} = request.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    return console.log("NO SUCH BLOG");
  }
  
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
}

module.exports = {
    GET_blogs,
    POST_blog,
    PUT_blog,
    DELETE_blog,
}