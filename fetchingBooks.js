const axios = require('axios');
const mongoose = require('mongoose');
const assert = require('assert');
// const methodOverride = require('method-override');
const { NewBooks, EditorsChoice, LivesBooks, TopNovels,TerryPratchett, AllOfTheBooks } = require('./models/book');

mongoose.connect('mongodb://localhost:27017/booksApp')
.then(() => {
    console.log("MONGO CONNECTION OPEN!");
}).catch(err => {
    console.log("Oh no, Mongo connection lost");
    console.log(err);
})



const bookArray = [
    { title: "the silence of the girls" },
    { title:  "red shoes" },
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
    { title: "Metropolis: A History of the City, Humankind's Greatest Invention" },
    { title: "the shadows alex north" },
    { title: "Good Omens" },
    { title: "The Colour of Magic" },
    { title: "Mort Terry Pratchett" },
    { title: "equal rites" },
    { title: "Going postal" },
    { title: "Beautiful Creatures" }
]




async function fetchedBooks(bookArray) {

    const newBookData = [];
    for (let i = 0; i < bookArray.length; i++) {
      const res = await axios.get(`http://openlibrary.org/search.json?q=` + bookArray[i].title);


      const newBook = {
        title: res.data.docs[0].title,
        author: res.data.docs[0].author_name,
        cover: "https://covers.openlibrary.org/b/id/" + res.data.docs[0].cover_i + "-M.jpg",
        numPages: res.data.docs[0].number_of_pages_median,
        isbn: res.data.docs[0].isbn[0]
      };
  
      newBookData.push(newBook);
      console.log(newBook.title)
      
    }

    AllOfTheBooks.find().remove();

    for (let i = 0; i < newBookData.length; i++){
        new AllOfTheBooks(newBookData[i]).save();

    }

   
    const filterArray = ['The Silence of the Girls', 'Red Shoes', 'The Trouble with Peace', 'The Island of Missing Trees','Stalin', 'Happily Letter After' ]
    const filterTwoArray = ["The War of the Worlds", "My Grandmother Asked Me to Tell You She's Sorry", "Notes from the Underground", "Eichmann in Jerusalem" , "The Subtle Art of Not Giving a F*ck", "Speeches That Changed the World"   ]
    const filterThreeArray = ["Gazza", "Elon Musk and the quest for a fantastic future", "Is This the Real Life?", "Alexander the Great" , "Leonardo da Vinci", "My Brother, Muhammad Ali"  ]
    const filterFourArray = ["Lady Clementine", "November 9", "How We Lived in Ancient Times", "Metropolis" , "The Shadows" ]
    const filterFiveArray = ["Good Omens" , "The Colour of Magic" , "Mort", "Equal Rites" , "Going Postal", "Beautiful Creatures"  ]
   const update = {rowOfBooks: 'New Books'}


await AllOfTheBooks.updateMany({"title": {$in:filterArray }}, {$set:{"rowOfBooks": "New Books"}})
await AllOfTheBooks.updateMany({"title": {$in:filterTwoArray }}, {$set:{"rowOfBooks": "Editors Choice"}})
await AllOfTheBooks.updateMany({"title": {$in:filterArray }}, {$set:{"rowOfBooks": "New Books"}})
await AllOfTheBooks.updateMany({"title": {$in:filterThreeArray }}, {$set:{"rowOfBooks": "Lives Books"}})
await AllOfTheBooks.updateMany({"title": {$in:filterFourArray }}, {$set:{"rowOfBooks": "Top Novels"}})
await AllOfTheBooks.updateMany({"title": {$in:filterFiveArray }}, {$set:{"rowOfBooks": "Terry Pratchett Books"}})

   
    }

fetchedBooks(bookArray);
   

 module.exports = { AllOfTheBooks }  