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
    // { title: "War of the worlds" },
    // { title: "My Grandmother Asked Me to Tell You She's Sorry" },
    // { title: "Notes from Underground" },
    // { title: "Jerusalem: The Biography" },
    // { title: "Mark Manson" },
    // { title: "speeches that changed the world" },
    // { title: "Gazza" },
    // { title: "elon musk: tesla, spacex, and the quest for a fantastic future" },
    // { title: "Is This the Real Life?" },
    // { title: "alexander the great anthony everitt" },
    // { title: "leonardo da vinci walter isaacson" },
    // { title: "My Brother, Muhammad Ali" },
    // { title: "Lady Clementine" },
    // { title: "November 9 colleen hoover" },
    // { title: "How We Lived in Ancient Times" },
    // { title: "war of the worlds" },
    // { title: "Metropolis: A History of the City, Humankind's Greatest Invention" },
    // { title: "the shadows alex north" },
    // { title: "Good Omens" },
    // { title: "The Colour of Magic" },
    // { title: "Mort Terry Pratchett" },
    // { title: "equal rites" },
    // { title: "Going postal" },
    // { title: "Beautiful Creatures" }
]




async function fetchedBooks(bookArray) {

    const newBookData = [];
    for (let i = 0; i < bookArray.length; i++) {
      //         // const config = { params: { q: searchTerm } };
      const res = await axios.get(`http://openlibrary.org/search.json?q=` + bookArray[i].title);

//   console.log(res.data.docs[0].title)
      const newBook = {
        title: res.data.docs[0].title,
        author: res.data.docs[0].author_name,
        cover: "https://covers.openlibrary.org/b/id/" + res.data.docs[0].cover_i + "-M.jpg",
        numPages: res.data.docs[0].number_of_pages_median,
        isbn: res.data.docs[0].isbn[0]
      };
  
      newBookData.push(newBook);
      
    }

// console.log(newBookData[1])
    AllOfTheBooks.find().remove();

    for (let i = 0; i < newBookData.length; i++){
        new AllOfTheBooks(newBookData[i]).save();
        console.log(newBookData)
    }

    const filterOne = {title: "The Silence of the Girls"} 
    const filterTwo = {title: "red shoes"} 
    const filterThree = {title:"the trouble with peace" } 
    const filterFour = {title: "island of the missing trees"} 
    const filterFive = {title:"stalin" } 
    const filterSix = {title: "Happily letter after"} 
    const filterArray = ['The Silence of the Girls', 'Red Shoes', 'The Trouble with Peace', 'The Island of Missing Trees','Stalin' ]

   const update = {rowOfBooks: 'New Books'}

//    await AllOfTheBooks.findOneAndUpdate(filterOne, update)
//    await AllOfTheBooks.findOneAndUpdate(filterTwo, update)

//    await AllOfTheBooks.updateOne({ title: "Stalin" }, { $set: { rowOfBooks: "New Books" } }, { multi: true })

//    await AllOfTheBooks.updateMany(
//     [{title: 'The Silence of the Girls'}, {title: 'red shoes'}, {title: 'the trouble with peace'}], 
//     {rowOfBooks : 'New Books' },
//     {multi:true}, 
//       function(err, numberAffected){  
//       });

// db.allofthebooks.update({}, {$set: {"rowOfBooks": "New Books"}}, false, true)

await AllOfTheBooks.updateMany({}, {$set:{"rowOfBooks": "New Books"}})
   
//    await AllOfTheBooks.aggregate([
//     {$match: {"title": {"$in": filterArray}}},
//     {"$addFields": {rowOfBooks: update}}
//    ])
  
   
    }


   

 module.exports = fetchedBooks(bookArray) 