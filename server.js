const fs = require("fs");
const express = require('express');
const path = require("path");
const  uuid  = require("uuid");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// getting notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

// using fs module to get db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (error, data) => {
        if (error) {
            throw error;
        }
        res.send(data)
    })
})
// Post --> to get new notes
app.post('/api/notes', (req, res) => {
    const dataNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body;
    newNote.id = uuid.v4();
   dataNotes.push(newNote);
    
    
    // console.log(req.body);
    // res.json(req.body);

    fs.writeFileSync("./db/db.json", JSON.stringify(dataNotes));
    res.json(newNote)
    });

// to Delete notes
app.delete("/api/notes/:id", (req, res) => {
    const dataNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    const removeNotes = dataNotes.filter((deleteNote) => 
        deleteNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(removeNotes));
    res.json(removeNotes);
})

// to get all
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})


app.listen(process.env.PORT || 3001, () => {
    console.log(`API server now on port 3001!`);
});