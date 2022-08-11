// Fetches books from the public API and stores them in local MongoDB Database

const axios = require("axios");
const mongoose = require("mongoose");
const assert = require("assert");
// const methodOverride = require('method-override');
const { AllOfTheBooks } = require("./models/book");

mongoose
  .connect("mongodb://localhost:27017/booksApp")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("Oh no, Mongo connection lost");
    console.log(err);
  });

const bookArray = [
  { title: "the silence of the girls" },
  { title: "red shoes" },
  { title: "the trouble with peace" },
  { title: "island of the missing trees" },
  { title: "stalin" },
  { title: "Happily letter after" },
  { title: "War of the worlds" },
  { title: "My Grandmother Asked Me to Tell You She's Sorry" },
  { title: "Notes from Underground" },
  { title: "Jerusalem: The Biography" },
  { title: "Mark Manson" },
  { title: "speeches that changed the world" },
  { title: "Gazza" },
  { title: "elon musk: tesla, spacex, and the quest for a fantastic future" },
  { title: "Is This the Real Life?" },
  { title: "alexander the great anthony everitt" },
  { title: "leonardo da vinci walter isaacson" },
  { title: "My Brother, Muhammad Ali" },
  { title: "Lady Clementine" },
  { title: "November 9 colleen hoover" },
  { title: "How We Lived in Ancient Times" },
  // { title: "war of the worlds" },
  {
    title: "Metropolis: A History of the City, Humankind's Greatest Invention",
  },
  { title: "the shadows alex north" },
  { title: "Good Omens" },
  { title: "The Colour of Magic" },
  { title: "Mort Terry Pratchett" },
  { title: "equal rites" },
  { title: "Going postal" },
  { title: "Beautiful Creatures" },
  { title: "Cold Enough for Snow" },
  { title: "Cathedral of the sea" },
  { title: "Midnight in the Garden of Good and Evil" },
  { title: "Do the Work" },
  { title: "The Altogether Unexpected Disappearance of Atticus Craftsman" },
  { title: "Watch Her Fall" },
  { title: "Grand Hotel Europa" },
  { title: "The book of snobs" },
  { title: "Seven Days in July" },
  { title: "Predatory Thinking" },
  { title: "Guns, germs, and steel" },
  { title: "Jane Eyre" },
  { title: "Eiffel" },
  { title: "Three Sisters" },
  { title: "Gargantis" },
  { title: "The splendid and the vile" },
  { title: "Toto the Ninja Cat and the Great Snake Escape" },
  { title: "Marie Curie and the Power of Persistence" },
  { title: "The Cat Who Saved Books" },
  { title: "Unwinding Anxiety" },
  { title: "Lessons in Chemistry" },
  { title: "These Precious Days: Essays" },
];

async function fetchedBooks(bookArray) {
  const newBookData = [];
  for (let i = 0; i < bookArray.length; i++) {
    const res = await axios.get(
      `http://openlibrary.org/search.json?q=` + bookArray[i].title
    );

    // console.log(res)
    const newBook = {
      title: res.data.docs[0].title,
      author: res.data.docs[0].author_name,
      cover:
        "https://covers.openlibrary.org/b/id/" +
        res.data.docs[0].cover_i +
        "-M.jpg",
      pages: res.data.docs[0].number_of_pages_median,
      isbn: res.data.docs[0].isbn[0],
      subject: res.data.docs[0].subject,
    };

    newBookData.push(newBook);
    console.log(newBookData);
  }

  AllOfTheBooks.find().remove();

  for (let i = 0; i < newBookData.length; i++) {
    new AllOfTheBooks(newBookData[i]).save();
  }

  const filterArray = [
    "Silence of the Girls",
    "Red Shoes",
    "The Trouble with Peace",
    "The Island of Missing Trees",
    "Stalin",
    "Happily Letter After",
  ];
  const filterTwoArray = [
    "The War of the Worlds",
    "My Grandmother Asked Me to Tell You She's Sorry",
    "Notes from the Underground",
    "Eichmann in Jerusalem",
    "The Subtle Art of Not Giving a F*ck",
    "Speeches That Changed the World",
  ];
  const filterThreeArray = [
    "Gazza",
    "Elon Musk and the quest for a fantastic future",
    "Is This the Real Life?",
    "Alexander the Great",
    "Leonardo da Vinci",
    "My Brother, Muhammad Ali",
  ];
  const filterFourArray = [
    "Lady Clementine",
    "November 9",
    "How We Lived in Ancient Times",
    "Metropolis",
    "The Shadows",
  ];
  const filterFiveArray = [
    "Good Omens",
    "The Colour of Magic",
    "Mort : (Discworld Novel 4)",
    "Equal Rites",
    "Going Postal",
    "Beautiful Creatures",
  ];
  const update = { rowOfBooks: "New Books" };

  await AllOfTheBooks.updateMany(
    { title: { $in: filterArray } },
    { $set: { rowOfBooks: "New Books" } }
  );
  await AllOfTheBooks.updateMany(
    { title: { $in: filterTwoArray } },
    { $set: { rowOfBooks: "Editors Choice" } }
  );
  await AllOfTheBooks.updateMany(
    { title: { $in: filterArray } },
    { $set: { rowOfBooks: "New Books" } }
  );
  await AllOfTheBooks.updateMany(
    { title: { $in: filterThreeArray } },
    { $set: { rowOfBooks: "Lives Books" } }
  );
  await AllOfTheBooks.updateMany(
    { title: { $in: filterFourArray } },
    { $set: { rowOfBooks: "Top Novels" } }
  );
  await AllOfTheBooks.updateMany(
    { title: { $in: filterFiveArray } },
    { $set: { rowOfBooks: "Terry Pratchett Books" } }
  );

  AllOfTheBooks.findOneAndUpdate(
    { title: "Silence of the Girls" },
    {
      $set: {
        genre: ["Fantasy", "Mithology", "Fiction", "History", "Adult", "War"],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Red Shoes" },
    { $set: { genre: ["Childrens", "Fiction"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "The Trouble with Peace" },
    { $set: { genre: ["Fantasy", "Fiction", "Adult", "War", "Epic"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "The Island of Missing Trees" },
    {
      $set: {
        genre: [
          "Fiction",
          "Fantasy",
          "Romance",
          "Historical",
          "Contemporary",
          "Adult",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Stalin" },
    {
      $set: {
        genre: ["Biography", "History", "Nonfiction", "Politics", "War"],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Happily Letter After" },
    { $set: { genre: ["Romance", "Contemporary", "Adult", "Fiction"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "The War of the Worlds" },
    {
      $set: {
        genre: [
          "Classics",
          "Science Fiction",
          "Fiction",
          "Fantasy",
          "Horror",
          "Novels",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "My Grandmother Asked Me to Tell You She's Sorry" },
    {
      $set: {
        genre: [
          "Fiction",
          "Contemporary",
          "Fantasy",
          "Humor",
          "Adult",
          "Family",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Notes from the Underground" },
    {
      $set: {
        genre: [
          "Classics",
          "Fiction",
          "Philosophy",
          "Literature",
          "Novels",
          "Psychology",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Eichmann in Jerusalem" },
    {
      $set: {
        genre: [
          "History",
          "Nonfiction",
          "Religion",
          "Biography",
          "Politics",
          "Travel",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "The Subtle Art of Not Giving a F*ck" },
    {
      $set: {
        genre: [
          "Nonfiction",
          "Self Help",
          "Psychology",
          "Philosophy",
          "Humor",
          "Adult",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Speeches That Changed the World" },
    {
      $set: {
        genre: [
          "History",
          "Nonfiction",
          "Politics",
          "Biography",
          "Philosophy",
          "Self Help",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Gazza" },
    { $set: { genre: ["Biography", "Nonfiction"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Elon Musk and the quest for a fantastic future" },
    {
      $set: {
        genre: ["Biography", "Nonfiction", "Business", "Science", "Leadership"],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Is This the Real Life?" },
    { $set: { genre: ["Music", "Nonfiction", "Biography", "History"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Alexander the Great" },
    {
      $set: {
        genre: [
          "Biography",
          "Nonfiction",
          "History",
          "Art",
          "Science",
          "Biography Memoir",
          "Historical",
          "Art history",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Leonardo da Vinci" },
    {
      $set: { genre: ["Biography", "Nonfiction", "History", "Art", "Science"] },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "My Brother, Muhammad Ali" },
    { $set: { genre: ["Biography", "Nonfiction", "Sports"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Lady Clementine" },
    { $set: { genre: ["Fiction", "History", "Adult", "War"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "November 9" },
    {
      $set: { genre: ["Romance", "Contemporary", "Fiction", "Adult", "Love"] },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "How We Lived in Ancient Times" },
    { $set: { genre: ["Children", "History"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Metropolis" },
    { $set: { genre: ["History", "Nonfiction", "Sociology", "Urban"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Shadow Friend" },
    {
      $set: {
        genre: [
          "Horror",
          "Thriller",
          "Mystery",
          "Fiction",
          "Adult",
          "Suspense",
          "Contemporary",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Good Omens" },
    {
      $set: {
        genre: ["Fantasy", "Fiction", "Humor", "Adult", "Science Fiction"],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "The Colour of Magic" },
    {
      $set: {
        genre: [
          "Fantasy",
          "Fiction",
          "Humor",
          "Science Fiction",
          "Adventure",
          "Novels",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Mort : (Discworld Novel 4)" },
    {
      $set: {
        genre: [
          "Fantasy",
          "Fiction",
          "Humor",
          "Science Fiction",
          "Novels",
          "Death",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Equal Rites" },
    {
      $set: {
        genre: ["Fantasy", "Fiction", "Humor", "Science Fiction", "Adventure"],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Going Postal" },
    {
      $set: {
        genre: [
          "Fantasy",
          "Fiction",
          "Humor",
          "Science Fiction",
          "Adventure",
          "Adult",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Beautiful Creatures" },
    { $set: { genre: ["Fantasy", "Romance", "Fiction"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Cold Enough for Snow" },
    { $set: { genre: ["Fiction", "Contemporary", "Novels"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Cathedral of the sea" },
    { $set: { genre: ["Fiction", "History", "Novels", "Romance"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Midnight in the Garden of Good and Evil" },
    { $set: { genre: ["Nonfiction", "Mystery", "History", "Classics"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Do the Work" },
    {
      $set: {
        genre: [
          "Nonfiction",
          "Self Help",
          "Business",
          "Psychology",
          "Art",
          "Philosophy",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "The Altogether Unexpected Disappearance of Atticus Craftsman" },
    {
      $set: {
        genre: [
          "Fiction",
          "Humor",
          "Contemporary",
          "Romance",
          "Mystery",
          "Adventure",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Watch Her Fall" },
    {
      $set: {
        genre: [
          "Thriller",
          "Mystery",
          "Fiction",
          "Adult",
          "Contemporary",
          "Psychology",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Grand Hotel Europa" },
    {
      $set: {
        genre: [
          "Fiction",
          "Roman",
          "Literature",
          "Novels",
          "Travel",
          "Contemporary",
          "Romance",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "The book of snobs" },
    {
      $set: { genre: ["Classics", "Fiction", "Humor", "Literature", "Novels"] },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Seven Days in July" },
    { $set: { genre: ["History", "Fiction"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Predatory Thinking" },
    {
      $set: {
        genre: [
          "Business",
          "Nonfiction",
          "Psychology",
          "Self Help",
          "Design",
          "Philosophy",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Guns, germs, and steel" },
    {
      $set: {
        genre: [
          "History",
          "Nonfiction",
          "Science",
          "Anthropology",
          "Sociology",
          "Politics",
          "Economics",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Jane Eyre" },
    {
      $set: {
        genre: [
          "Classics",
          "Fiction",
          "Romance",
          "Gothic",
          "Literature",
          "Historical",
          "Novels",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Eiffel" },
    { $set: { genre: ["History", "Nonfiction", "Biography"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Three Sisters" },
    { $set: { genre: ["Fiction", "History", "War", "Adult", "Family"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Gargantis" },
    {
      $set: {
        genre: [
          "Fantasy",
          "Mystery",
          "Adventure",
          "Childrens",
          "Fiction",
          "Horror",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "The splendid and the vile" },
    {
      $set: {
        genre: ["History", "Nonfiction", "Biography", "War", "Politics"],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Toto the Ninja Cat and the Great Snake Escape" },
    { $set: { genre: ["Childrens", "Animals", "Adventure"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Marie Curie and the Power of Persistence" },
    {
      $set: {
        genre: ["Nonfiction", "Science", "Childrens", "Biography", "History"],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "The Cat Who Saved Books" },
    { $set: { genre: ["Fantasy", "Fiction", "Animals", "Contemporary"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Unwinding Anxiety" },
    {
      $set: {
        genre: [
          "Nonfiction",
          "Psychology",
          "Self Help",
          "Science",
          "Health",
          "Spirituality",
          "Adult",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "Lessons in Chemistry" },
    {
      $set: {
        genre: [
          "Fiction",
          "Romance",
          "Feminism",
          "History",
          "Adult",
          "Humor",
          "Contemporary",
        ],
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
  AllOfTheBooks.findOneAndUpdate(
    { title: "These Precious Days" },
    { $set: { genre: ["Nonfiction", "Short Stories", "Biography", "Adult"] } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
}

fetchedBooks(bookArray);

module.exports = { AllOfTheBooks };
