// Dependencies
// ===========================================================
var express = require("express");
const path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

// set up the express app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
// Data
// ===========================================================
const characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }
];

// Create one more data entry for the character Obi Wan Kenobi.
// Enter any values you like for the parameters following the same format as the Yoda and Darth Maul character
//

// YOUR CODE GOES HERE

//

// Routes
// ===========================================================
// GENERAL ROUTE
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// ADD ROUTE
app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// GET ALL THE DATAS
app.get("/api/characters", (req, res) => {
  return res.json(characters);
});

// GET ONE OBJECT FROM DATAS
app.get("/api/characters/:character", (req, res) => {
  const chosen = req.params.character;
  // find obj in database based on routeName
  const chosenOne = characters.filter(obj => {
    return obj.routeName === chosen;
  });

  if (chosenOne.length) {
    return res.json(chosenOne[0]);
  }

  return res.send("character, i do not see.");
});

// ADD AN OBJECT TO THE DATAS
app.post("/api/characters", (req, res) => {
  const newCharacter = req.body;
  console.log(newCharacter);
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
  // add new character to database
  characters.push(newCharacter);
  // send back what was just added
  res.json(newCharacter);
});

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
