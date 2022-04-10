const express = require("express");
const router = express.Router();
const {POST_login} = require("../controllers/loginController");

router
    .route("/")
    .post(POST_login)


module.exports = router;