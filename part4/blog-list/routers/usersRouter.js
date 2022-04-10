const express = require("express");
const router = express.Router();
const {GET_users, POST_user} = require("../controllers/usersController");

router
    .route("/")
    .get(GET_users)
    .post(POST_user)

module.exports = router;