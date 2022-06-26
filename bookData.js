const mongoose = require('mongoose');
// const methodOverride = require('method-override');
const NewBooks = require('./models/book');

mongoose.connect('mongodb://localhost:27017/booksApp')
.then(() => {
    console.log("MONGO CONNECTION OPEN!");
}).catch(err => {
    console.log("Oh no, Mongo connection lost");
    console.log(err);
})

const newBooks = [
    {
    title: "Beatiful Creatures",
    author: "Terry Pratchett",
    cover: "https://covers.openlibrary.org/b/id/6280152-M.jpg",
    pages: 230,
    isbn: 95812192165
},
{
    title: "Metropolis",
    author: "Ben Wilson",
    cover: "https://covers.openlibrary.org/b/id/10544033-M.jpg",
    pages: 345,
    isbn: 95613216511
},
{
    title: "Leonardo da Vinci",
    author: "Walter Isaacson",
    cover: "https://covers.openlibrary.org/b/id/9227942-M.jpg",
    pages: 485,
    isbn: 95613651511
},
{
    title: "Verity",
    author: "Lisa T. Bergren",
    cover: "https://covers.openlibrary.org/b/id/8803217-M.jpg",
    pages: 145,
    isbn: 9586225622
},
{
    title: "Animal Farm",
    author: "George Orvell",
    cover: "https://covers.openlibrary.org/b/id/11261770-M.jpg",
    pages: 438,
    isbn: 95626186254
},
{
    title: "Happily Letter After",
    author: "Penelope Ward",
    cover: "https://covers.openlibrary.org/b/id/10630589-M.jpg",
    pages: 354,
    isbn: 9516516812165
}
]

NewBooks.insertMany(newBooks)
.then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})