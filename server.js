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
//Get route, homepage HTML sent
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
//Get route, notes HTML sent
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


//API / JSON routes
//Get route
app.get("/api/notes", function (req, res) {
    //Reading the note object array
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occured reading your data");
        }
        const arrayOfNotes = JSON.parse(data);
        res.json(arrayOfNotes);
    });
});

//Post route
app.post("/api/notes", (req, res) => {
    //Reading the note object array
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occured reading your data");
        }
        const arrayOfNotes = JSON.parse(data);
        //Spreading ID key into note object array
        const note = { ...req.body, id: arrayOfNotes.length }
        //ID gets pushed into array
        arrayOfNotes.push(note);
        //Write file, stringifying it, new note appears in db.json file w/ id
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
//Delete Route
app.delete("/api/notes/:id", function (req, res) {
    //Reading the note object array
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            return res.send("An error occured reading your data");
        }
        const arrayOfNotes = JSON.parse(data);
        //Filter through the data, if id does not match selected one, then gets pushed into new notes array
        const deletedNote = arrayOfNotes.filter(function (note) {
            return note.id != req.params.id;
        })
        //Write file, stringifying it, new note appears in db.json file
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
    })
});

//Catch all for user URL input
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
//Listen on that port
app.listen(PORT, (req, res) => {
    console.log(`Currently running on http://localhost:${PORT}`);
});
