const Blog = require("../models/blog");

const GET_blogs = async (request, response) => {
  console.log("GET_blogs")
    const blogs = await Blog.find({});
    response.json(blogs);
  }
  
const POST_blog = async (request, response) => {
    const blog = new Blog(request.body);

    console.log(blog, "<<<<");

    const result = await blog.save();
    response.status(201).json(result);
  };

module.exports = {
    GET_blogs,
    POST_blog,
}