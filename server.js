//Require express
const express = require("express");
//Create instance of express called app
const app = express();
//Add a port 
const PORT = process.env.PORT || 3000;

//Add data processing for POST routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//View / HTML routes
app.get("/", (req,res) => {
    res.send("Hello world");
})

//API / JSON routes


//Listen on that port
app.listen(PORT, (req,res) =>{
    console.log(`Currently running on http://localhost:${PORT}`)
});

