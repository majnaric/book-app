const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const redditData = require("./data.json");
// const bookData = require('./bookData.json');
const bookSearch = require("./bookSearch.js");
const mongoose = require("mongoose");
const ObjectId = require("bson-objectid");
require("./public/parallax.js")
// const methodOverride = require('method-override');
const { AllOfTheBooks } = require("./models/book");

bookSearch;

mongoose
  .connect("mongodb://localhost:27017/booksApp")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("Oh no, Mongo connection lost");
    console.log(err);
  });

  app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/rand", async (req, res) => {
  // const dataOfAllBooks = await AllOfTheBooks.find({})
  // const dataOfEditorsChoice = await EditorsChoice.find({})
  // const dataOfLivesBooks = await LivesBooks.find({})
  // const dataOfTopNovels = await TopNovels.find({})
  // const dataOfPratchett = await TerryPratchett.find({})
  // console.log(dataOfNewBooks);

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

  res.render("random.ejs", {
    newBooksFound,
    editorsChoiceFound,
    livesBooksFound,
    topNovelsFound,
    terryPratchettFound,
  });
});

app.get("/rand/:id", async (req, res) => {
  const { id, title } = req.params;

  const singleBooks = await AllOfTheBooks.findById(id);

  console.log(singleBooks.cover)

  res.render("single", { singleBooks });
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("notfound", { subreddit });
  }
});

app.get("/r/:subreddit/:postId", (req, res) => {
  const { subreddit, postId } = req.params;
  res.send(`Viewing ${postId} post on the ${subreddit} subreddit`);
});

app.get("/books", (req, res) => {
  var books = Object.values(bookData);
  console.log(books);
  res.render("books.ejs", { books });
});

app.post("/search", async (req, res) => {
  const { books } = req.body;
  const config = { params: { q: books } };

  const result = await axios.get(
    `http://openlibrary.org/search.json?details=true&`,
    config
  );
  const anotherResult = await axios.get(
    `http://openlibrary.org/search.json`,
    config
  );
  const booksSearched = result.data.docs;

  // Check if in first seed there is a book reference it console logs it is a book
  booksSearched[12].seed[0].includes("books")
    ? console.log("this is a book")
    : console.log("this is not a book");
  console.log(booksSearched[12].seed[0]);
  res.render("search.ejs", { booksSearched });
});

app.get("/cats", (req, res) => {
  const cats = ["Blue", "Rocket", "Monty", "Stephanie", "Winston"];
  res.render("cats.ejs", { cats });
});

app.get("/dogs", (req, res) => {
  res.send("WOOF!");
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send("Nothing found if nothing searched!");
  }
  res.send(`<h1>Search results for ${q}:</h1>`);
});

app.get("*", (req, res) => {
  res.send(`This page doesn't exist`);
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
