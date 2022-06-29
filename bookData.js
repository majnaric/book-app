const mongoose = require('mongoose');
// const methodOverride = require('method-override');
const { NewBooks, EditorsChoice, LivesBooks, TopNovels,TerryPratchett } = require('./models/book');

mongoose.connect('mongodb://localhost:27017/booksApp')
.then(() => {
    console.log("MONGO CONNECTION OPEN!");
}).catch(err => {
    console.log("Oh no, Mongo connection lost");
    console.log(err);
})

const newBooksData = [
    {
    title: "The Silence of the Girls",
    author: "Pat Barker",
    cover: "https://covers.openlibrary.org/b/id/8834880-M.jpg",
    pages: 320,
    isbn: 9780241983201,
    bookId: 35
},
{
    title: "Red Shoes",
    author: "Eleri Glass, Ashley Spire",
    cover: "https://covers.openlibrary.org/b/id/3037855-M.jpg",
    pages: 40,
    isbn: 9781894965781,
    bookId: 35
},
{
    title: "The Trouble with Peace",
    author: "Joe Abercrombie",
    cover: "https://covers.openlibrary.org/b/id/10299646-M.jpg",
    pages: 528,
    isbn: 0316187194,
    bookId: 35
},
{
    title: "The Island of Missing Trees",
    author: "Elif Shafak",
    cover: "https://covers.openlibrary.org/b/id/11570235-M.jpg",
    pages: 145,
    isbn: 9780241988725,
    bookId: 35
},
{
    title: "Stalin",
    author: "Simon Sebag-Montefiore",
    cover: "https://covers.openlibrary.org/b/id/745316-M.jpg",
    pages: 785,
    isbn: 9788484325468,
    bookId: 35
},
{
    title: "Happily Letter After",
    author: "Penelope Ward",
    cover: "https://covers.openlibrary.org/b/id/10630589-M.jpg",
    pages: 354,
    isbn: 9516516812165,
    bookId: 35
}
]

const editorsChoiceData = [
    {
    title: "The War of the Worlds",
    author: "H. G. Wells",
    cover: "https://covers.openlibrary.org/b/id/36314-M.jpg",
    pages: 204,
    isbn: 1505260795,
    bookId: 35
},
{
    title: "My Grandmother Asked Me to Tell You She's Sorry",
    author: "Fredrik Backman",
    cover: "https://covers.openlibrary.org/b/id/9723648-M.jpg",
    pages: 400,
    isbn: 1594139903,
    bookId: 35
},
{
    title: "Notes from the Underground",
    author: "Fyodor Dostoevsky",
    cover: "https://covers.openlibrary.org/b/id/12644033-M.jpg",
    pages: 130,
    isbn: 153712949,
    bookId: 35
},
{
    title: "Eichmann in Jerusalem",
    author: "Hannah Arendt",
    cover: "https://covers.openlibrary.org/b/id/97789-M.jpg",
    pages: 312,
    isbn: 9783492203081,
    bookId: 35
},
{
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    cover: "https://covers.openlibrary.org/b/id/8231990-M.jpg",
    pages: 224,
    isbn: 9781400213306,
    bookId: 35
},
{
    title: "Speeches That Changed the World",
    author: "Simon Sebag-Montefiore",
    cover: "https://covers.openlibrary.org/b/id/2039967-M.jpg",
    pages: 224,
    isbn: 9780857382474,
    bookId: 35
}
]

const livesBooksData = [
    {
    title: "Gazza",
    author: "Paul Gascoigne",
    cover: "https://covers.openlibrary.org/b/id/2583252-M.jpg",
    pages: 230,
    isbn: 9780857579474,
    bookId: 35
},
{
    title: "Elon Musk and the quest for a fantastic future",
    author: "Ashlee Vance",
    cover: "https://covers.openlibrary.org/b/id/11336541-M.jpg",
    pages: 384,
    isbn: 951265152198,
    bookId: 35
},
{
    title: "Is This the Real Life?",
    author: "Mark Blake",
    cover: "https://covers.openlibrary.org/b/id/9108343-M.jpg",
    pages: 297,
    isbn: 915265165165,
    bookId: 35
},
{
    title: "Alexander the Great",
    author: "Anthony Everitt",
    cover: "https://covers.openlibrary.org/b/id/8771686-M.jpg",
    pages: 652,
    isbn: 916516216516,
    bookId: 35
},
{
    title: "Leonardo da Vinci",
    author: "Walter Isaacson",
    cover: "https://covers.openlibrary.org/b/id/9227942-M.jpg",
    pages: 649,
    isbn: 9165162165165,
    bookId: 35
},
{
    title: "My Brother, Muhammad Ali",
    author: "Rahaman Ali,Fiaz Rafiq",
    cover: "https://covers.openlibrary.org/b/id/11448078-M.jpg",
    pages: 362,
    isbn: 152615216512,
    bookId: 35
}
]

const topNovelsData = [
    {
    title: "Lady Clementine",
    author: "Marie Benedict",
    cover: "https://covers.openlibrary.org/b/id/9247561-M.jpg",
    pages: 362,
    isbn: 152615216512,
    bookId: 35
},
{
    title: "November 9",
    author: "Colleen Hoover",
    cover: "https://covers.openlibrary.org/b/id/12441033-M.jpg",
    pages: 400,
    isbn: 1594139903,
    bookId: 35
},
{
    title: "How We Lived in Ancient Times",
    author: "Ben Hubbard",
    cover: "https://covers.openlibrary.org/b/id/10917616-M.jpg",
    pages: 130,
    isbn: 153712949,
    bookId: 35
},
{
    title: "The War of the Worlds",
    author: "H. G. Wells",
    cover: "https://covers.openlibrary.org/b/id/36314-M.jpg",
    pages: 204,
    isbn: 1505260795,
    bookId: 35
},
{
    title: "Metropolis",
    author: "Ben Wilson",
    cover: "https://covers.openlibrary.org/b/id/10544033-M.jpg",
    pages: 224,
    isbn: 9781400213306,
    bookId: 35
},
{
    title: "The Shadows",
    author: "Alex North, Hannah Arterton, John Heffernan",
    cover: "https://covers.openlibrary.org/b/id/10150584-M.jpg",
    pages: 224,
    isbn: 9780857382474,
    bookId: 35
}
]

const terryPratchettData = [
    {
    title: "Good Omens",
    author: "Terry Pratchett",
    cover: "https://covers.openlibrary.org/b/id/9290896-M.jpg",
    pages: 204,
    isbn: 1505260795,
    bookId: 35
},
{
    title: "The Colour of Magic",
    author: "Terry Pratchett",
    cover: "https://covers.openlibrary.org/b/id/43549-M.jpg",
    pages: 400,
    isbn: 1594139903,
    bookId: 35
},
{
    title: "Mort",
    author: "Terry Pratchett",
    cover: "https://covers.openlibrary.org/b/id/1008668-M.jpg",
    pages: 130,
    isbn: 153712949,
    bookId: 35
},
{
    title: "Equal Rites",
    author: "Terry Pratchett",
    cover: "https://covers.openlibrary.org/b/id/379714-M.jpg",
    pages: 312,
    isbn: 9783492203081,
    bookId: 35
},
{
    title: "Going Postal",
    author: "Terry Pratchett",
    cover: "https://covers.openlibrary.org/b/id/261852-M.jpg",
    pages: 224,
    isbn: 9781400213306,
    bookId: 35
},
{
    title: "Beautiful Creatures",
    author: "Terry Pratchett",
    cover: "https://covers.openlibrary.org/b/id/6280152-M.jpg",
    pages: 224,
    isbn: 9780857382474,
    bookId: 35
}
]

NewBooks.insertMany(newBooksData)
.then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

EditorsChoice.insertMany(editorsChoiceData)
.then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

LivesBooks.insertMany(livesBooksData)
.then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

TopNovels.insertMany(topNovelsData)
.then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

TerryPratchett.insertMany(terryPratchettData)
.then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})



