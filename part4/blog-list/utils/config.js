require("dotenv").config();

const PORT = process.env.PORT || 3003;
const URL = process.env.NODE_ENV === "test" ? process.env.MONGODB_URL_TEST : process.env.MONGODB_URL;

module.exports = {
    PORT,
    URL,
}