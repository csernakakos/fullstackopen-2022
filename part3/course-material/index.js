const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

let notes = [
    {    id: 0,    content: "HTML is easy",    date: "2022-05-30T17:30:31.098Z",    important: true  },  {    id: 1,    content: "Browser can execute only Javascript",    date: "2022-05-30T18:39:34.091Z",    important: false  },  {    id: 2,    content: "GET and POST are the most important methods of HTTP protocol",    date: "2022-05-30T19:20:14.298Z",    important: true  }
]

const app = express();
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

app.get("/", (req, res) => {
    res.json({"hello_world": true})
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find((note) => note.id === id);

    if (!note) {
        return res.status(404).end();
    } 

    res.json(note);   
});

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

app.post("/api/notes", (req, res) => {
    const body = req.body;
    
    if (!body.content) {
        return res.status(400).json({error: "content missing"})
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note);
    res.json({
        success: true,
        note
    });
});

app.put("/api/notes/:id", (req, res) => {
    res.status(204).end();
});

app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter((n) => n.id !== id);

    res.status(204).end();
});



app.listen(PORT);
console.log(`Server running on ${PORT}...`)