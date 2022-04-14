const { response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const POST_test = async (req, res) => {
    console.log("POST_test")
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end();
};

module.exports = {
    POST_test,
}

