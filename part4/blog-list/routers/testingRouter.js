const express = require("express");
const router = express.Router();
const {POST_test} = require("../controllers/testingController")

router
    .route("/reset")
    .post(POST_test);

module.exports = router;