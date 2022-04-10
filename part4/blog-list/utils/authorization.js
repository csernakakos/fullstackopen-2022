const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protectWithToken = async (req, res, next) => {
    const authorization = req.get("authorization");
    let token;

    console.log("HEY")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7);
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded.id) {
        return response.status(401).json({error: "token missing or incorrect."})
      }

    req.user = await User.findById(decoded.id)
    next();
}

module.exports = protectWithToken