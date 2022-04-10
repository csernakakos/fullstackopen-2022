const Blog = require("../models/blog");
const User = require("../models/user");

// GET_blogs.rest
const GET_blogs = async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username: 1, name: 1, id: 1});
    response.json(blogs);
  }

// POST_blog.rest
const POST_blog = async (request, response) => {
    const body = request.body;
    const user = await User.findById(body.userId);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: request.user._id,
    });


    if (!blog.title || !blog.url) {
      response.status(400).end()
    }

    if (!blog.likes) {
      blog.likes = 0;
    }

    const result = await blog.save();

    request.user.blogs = request.user.blogs.concat(result._id);
    
    await request.user.save();
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
  const {user} = request;

  if (!user) {
    return response.status(401).json({
      error: "You're not authorized."
    })
  };

  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(401).json({
      error: "No such blog."
    })
  }

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } else {
    response.status(401).json({
      error: "You're not authorized to delete this blog."
    })
  }
  
}

module.exports = {
    GET_blogs,
    POST_blog,
    PUT_blog,
    DELETE_blog,
}