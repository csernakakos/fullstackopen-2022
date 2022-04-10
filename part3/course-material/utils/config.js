require("dotenv").config();

const PORT = process.env.PORT || 3001;
const URL = process.env.NODE_ENV === "test"
    ? process.env.MONGODBURL_TEST
    : process.env.MONGODBURL

console.log(URL);

module.exports = {
    PORT,
    URL,
}