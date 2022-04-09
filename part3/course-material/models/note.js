
// const dotenv = require("dotenv");
const mongoose = require("mongoose");

const URL = process.env.MONGODBURL;

mongoose
    .connect(URL)
    .then(result => {console.log('connected to MongoDB')})
    .catch((error) => {console.log('error connecting to MongoDB:', error.message)})

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 5,
    },
    date: {
        type: Date,
        required: true,
    },
    important: Boolean,
});

noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Note", noteSchema);