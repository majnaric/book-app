// Connects all the files of the webpage

if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}




const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ObjectId = require("bson-objectid");
const { AllOfTheBooks } = require("./models/book");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/booksApp";

// "mongodb://localhost:27017/booksApp"


// connecting to MongoDB
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MONGO CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("Oh no, Mongo connection lost");
    console.log(err);
  });



app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/home", async (req, res) => {
  const newBooksFound = await AllOfTheBooks.find({ rowOfBooks: "New Books" });
  const editorsChoiceFound = await AllOfTheBooks.find({
    rowOfBooks: "Editors Choice",
  });
  const livesBooksFound = await AllOfTheBooks.find({
    rowOfBooks: "Lives Books",
  });
  const topNovelsFound = await AllOfTheBooks.find({ rowOfBooks: "Top Novels" });
  const terryPratchettFound = await AllOfTheBooks.find({
    rowOfBooks: "Terry Pratchett Books",
  });

  res.render("home.ejs", {
    newBooksFound,
    editorsChoiceFound,
    livesBooksFound,
    topNovelsFound,
    terryPratchettFound,
  });
});

// Open SIngle Books found by their ID

app.get("/home/:id", async (req, res) => {
  const { id, title } = req.params;

  const singleBooks = await AllOfTheBooks.findById(id);

  res.render("single", { singleBooks });
});

// Open Books by their Genre in sidenav of the Homepage

app.get("/:genre", async (req, res) => {
  const genreBooks = req.params;

  if (genreBooks.genre == "favicon.ico") {
  } else {
    const fantasyBooks = await AllOfTheBooks.find({ genre: "Fantasy" });
    const romanceBooks = await AllOfTheBooks.find({ genre: "Romance" });
    const historyBooks = await AllOfTheBooks.find({ genre: "History" });
    const adultBooks = await AllOfTheBooks.find({ genre: "Adult" });
    const warBooks = await AllOfTheBooks.find({ genre: "War" });
    const childBooks = await AllOfTheBooks.find({ genre: "Childrens" });
    const contemporaryBooks = await AllOfTheBooks.find({
      genre: "Contemporary",
    });
    const biographyBooks = await AllOfTheBooks.find({ genre: "Biography" });
    const nonfictionBooks = await AllOfTheBooks.find({ genre: "Nonfiction" });
    const classicsBooks = await AllOfTheBooks.find({ genre: "Classics" });
    const sciencefictionBooks = await AllOfTheBooks.find({
      genre: "Science Fiction",
    });
    const novelsBooks = await AllOfTheBooks.find({ genre: "Novels" });
    const humorBooks = await AllOfTheBooks.find({ genre: "Humor" });
    const philosophyBooks = await AllOfTheBooks.find({ genre: "Philosophy" });
    const psichologyBooks = await AllOfTheBooks.find({ genre: "Psychology" });
    const selfhelpBooks = await AllOfTheBooks.find({ genre: "Self Help" });
    const scienceBooks = await AllOfTheBooks.find({ genre: "Science" });
    const adventureBooks = await AllOfTheBooks.find({ genre: "Adventure" });
    const mysteryBooks = await AllOfTheBooks.find({ genre: "Mystery" });
    const fictionBooks = await AllOfTheBooks.find({ genre: "Fiction" });

    res.render(`./genre/${genreBooks.genre}`, {
      fantasyBooks,
      romanceBooks,
      psichologyBooks,
      historyBooks,
      adultBooks,
      warBooks,
      childBooks,
      fictionBooks,
      contemporaryBooks,
      biographyBooks,
      nonfictionBooks,
      classicsBooks,
      sciencefictionBooks,
      novelsBooks,
      humorBooks,
      philosophyBooks,
      selfhelpBooks,
      scienceBooks,
      adventureBooks,
      mysteryBooks,
    });
  }
});


// Fetching and displaying results of search in a separate webpage
app.post("/search", async (req, res) => {
  const { books } = req.body;

  const config = { params: { q: books } };

  const result = await axios.get(
    `http://openlibrary.org/search.json?details=true&`,
    config
  );

  const booksSearched = result.data.docs;

  res.render("search.ejs", { booksSearched });
});


// Backup display for page not found

app.get("*", (req, res) => {
  res.send(`This page doesn't exist`);
});

// const PORT = 0.0.0.0;
app.listen(process.env.PORT, () => {
    console.log(`Our app is running on port ${ process.env.PORT }`);
});
