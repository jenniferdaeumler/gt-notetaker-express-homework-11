//Require express
const express = require("express");
//Other dependencies
const path = require("path");
//require FS
const fs = require("fs");
//Create instance of express called app
const app = express();
//Add a port
const PORT = process.env.PORT || 3000;

//Add data processing for POST routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Serving static files in Express (from documentation)
app.use(express.static("public"));

//View / HTML routes
// * GET `*` - Should return the `index.html` file I DON'T HAVE THIS
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
// * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//API / JSON routes
//GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
//Connect db.json file to server.js file
//Do I need word "return"??

//why do I have this -->
const db = require("./db/db.json");
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occured reading your data");
        }
        const arrayOfNotes = JSON.parse(data);
        res.json(arrayOfNotes);
    });
});

// //POST `/api/notes` - Should receive a new note to save on the request body,
// add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occured reading your data");
        }
        const arrayOfNotes = JSON.parse(data);
        const note = { ...req.body, id: arrayOfNotes.length }
        arrayOfNotes.push(note);
        fs.writeFile(
            "./db/db.json",
            JSON.stringify(arrayOfNotes),
            "utf8",
            (err) => {
                if (err) {
                    return res.send("An error occured writing your data");
                }
                res.json(arrayOfNotes);
            }
        )
    })
});
//DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note,
// you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then
// rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function (req, res) {
    // res.send("Delete request for note");
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occured reading your data");
        }
        const arrayOfNotes = JSON.parse(data);
        console.log(arrayOfNotes);
        // filter data 
        const deletedNote = arrayOfNotes.filter(function (note) {
            return note.id != req.params.id;
        })  
        console.log(deletedNote);
        // write to db
        fs.writeFile(
            "./db/db.json",
            JSON.stringify(deletedNote),
            "utf8",
            (err) => {
                if (err) {
                    return res.send("An error occured writing your data");
                }
                res.json(deletedNote);
            }
        )
    })});

    //FS for the db.json file

    //Listen on that port
    app.listen(PORT, (req, res) => {
        console.log(`Currently running on http://localhost:${PORT}`);
    });
