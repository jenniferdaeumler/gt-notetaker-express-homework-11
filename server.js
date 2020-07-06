//Require express
const express = require("express");
//Create instance of express called app
const app = express();
//Add a port 
const PORT = process.env.PORT || 3000;

//Add data processing for POST routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Serving static files in Express (from documentation)
app.use(express.static('public'));

//View / HTML routes 
// * GET `/notes` - Should return the `notes.html` file.
// * GET `*` - Should return the `index.html` file
app.get("/notes", (req,res) => {
    return res.sendFile(path.join(__dirname, "./public/notes.html"));
});


//API / JSON routes
    //GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
    //POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    //DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


//FS for the db.json file

//Listen on that port
app.listen(PORT, (req,res) =>{
    console.log(`Currently running on http://localhost:${PORT}`)
});
