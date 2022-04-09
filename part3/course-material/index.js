const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: "./.env"});
const cors = require("cors");
const Note = require("./models/note");

// ------------
// .ENV, DATABASE
const PORT = process.env.PORT || 3001;

// ------------
// MIDDLEWARE
const app = express();
app.use(express.static("build"));
app.use(cors());
app.use(express.json());

const requestLogger = (req, res, next) => {
    console.log("Method:", req.method);
    console.log("Path:", req.path);
    console.log("Body:", req.body);
    console.log("---");
    next();
};

app.use(requestLogger);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 

    if (error.name === "ValidationError") {
        return response.status(400).json({error: error.message});
    }
  
    next(error)
  }


// ------------
// ROUTES

// GET home page
app.get("/", (req, res) => {
    res.json({"hello_world": true})
});

// GET_all_notes.rest
app.get("/api/notes", (req, res) => {
    Note
        .find({})
        .then(notes => {
            res.json(notes);
        })
});


// app.get('/api/notes/:id', (request, response) => {
//     Note.findById(request.params.id).then(note => {
//       response.json(note)
//     })
//   })

// GET_note.rest
app.get('/api/notes/:id', async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).send("Not found");
        };
        res.status(200).json(note);

    } catch (error) {
        next(error);
    }
  })

// POST_note.rest
app.post("/api/notes", (req, res) => {
    const body = req.body;
    
    if (!body.content) {
        return res.status(400).json({error: "content missing"})
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        // id: generateId(),
    });

    note
        .save()
        .then(savedNote => {
            res.json(savedNote);
        })
        .catch(error => next(error)) 
});

// PUT_note.rest
app.put("/api/notes/:id", async (req, res, next) => {
    console.log("PUT!")
    try {
        const {id} = req.params;
        const {content, important} = req.body;

        const newNote = {
            content,
            important
        }
        
        await Note.findByIdAndUpdate(id, {content, important}, {new: true, runValidators: true, context: "query"});
        res.json(newNote);

    } catch (error) {
        next(error);
    }
});

// DELETE_note.rest
app.delete("/api/notes/:id", async (req, res, next) => {
    console.log("DELETE")
    try {
        const {id} = req.params;
        console.log(id);
        await Note.findByIdAndDelete(id);
        res.status(204).end();

    } catch (error) {
        next(error);
    }
});


// ------------
// ERRORS

app.use(errorHandler);

// ------------
// EXPRESS LISTEN
app.listen(PORT);
console.log(`Server running on ${PORT}...`)