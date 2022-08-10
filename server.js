const fs = require("fs");
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})



app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (error, data) => {
        if (error) {
            throw error;
            
        }
        res.send(data)
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });