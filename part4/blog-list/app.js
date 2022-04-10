const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./routers/blogsRouter");

// EXPRESS APP
const app = express();

// DATABASE
logger.info("Connecting to: ", config.URL);
mongoose.connect(config.URL)
.then(() => logger.info("Connected to MongoDB"))
.catch((err) => {logger.error(err.message)});

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.get("/", (req, res) => {
    logger.info("/")
    res.send("HOME")
})
app.use("/api/blogs", blogsRouter);

app.listen(config.PORT, () => {
    logger.info(`BLOG-LIST running on port ${config.PORT}...`)
});

module.exports = app;