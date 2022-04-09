const express = require("express");
const router = express.Router();
const {GET_blogs, POST_blog} = require("../controllers/blogsController");


router
    .route("/")
    .get(GET_blogs)
    .post(POST_blog)

module.exports = router;


