const express = require("express");
const router = express.Router();
const {GET_blogs, POST_blog, PUT_blog, DELETE_blog} = require("../controllers/blogsController");


router
    .route("/")
    .get(GET_blogs)
    .post(POST_blog)

router
    .route("/:id")
    .put(PUT_blog)
    .delete(DELETE_blog)

module.exports = router;


