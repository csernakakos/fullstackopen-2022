const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Provide a password.")
    process.exit(1)
}

const password = process.argv[2];

const URL = `mongodb+srv://akos:${password}@swiper.jgv2v.mongodb.net/NoteApp?retryWrites=true&w=majority`;

mongoose.connect(URL);

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    });
    mongoose.connection.close();
})

// const note = new Note({
//         content: "HTML is easy",
//         date: new Date(),
//         important: true,
// });

// note.save().then(result => {
//     console.log("saved note!");
//     mongoose.connection.close();
// });