const express = require("express");
const router = express.Router();
const {GET_blogs, POST_blog, PUT_blog, DELETE_blog} = require("../controllers/blogsController");
const protectWithToken = require("../utils/authorization");


router
    .route("/")
    .get(GET_blogs)
    .post(protectWithToken, POST_blog)

router
    .route("/:id")
    .put(protectWithToken, PUT_blog)
    .delete(protectWithToken, DELETE_blog)

module.exports = router;


