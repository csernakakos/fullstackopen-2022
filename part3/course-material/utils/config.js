require("dotenv").config();

const PORT = process.env.PORT || 3001;
const URL = process.env.MONGODBURL;

module.exports = {
    PORT,
    URL,
}