const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// POST_login.rest
const POST_login = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    const isPasswordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHashed);

    
    if (!(user && isPasswordCorrect)) {
        return res.status(401).json({
            error: "incorrect user name or password"
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {expiresIn: 60 * 60}
    )

    res
        .status(200)
        .send({
            token,
            username: user.username,
            name: user.name,
        }) 
}

module.exports = {
    POST_login
}