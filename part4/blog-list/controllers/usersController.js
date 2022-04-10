const User = require("../models/user");
const bcrypt = require("bcryptjs");

const GET_users = async (req, res) => {
    const users = await User.find().populate("blogs", {title: 1, author: 1, url: 1, likes: 1});
    res.status(200).json(users)
}

const POST_user = async (req, res) => {
    const {username, name, password} = req.body;

    // Is this user name already taken?
    const existingUser = await User.findOne({username});
    if (existingUser) {
        return res.status(400).json({error: "This user name already exists."});
    }

    // Is the password at least 3 characters long?
    if (password.length < 3) {
        return res.status(400).json({error: "Please provide a password that is at least 3 characters long."})
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        name,
        passwordHashed,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
};

module.exports = {
    GET_users,
    POST_user
}