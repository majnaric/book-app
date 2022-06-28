const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');
const bookData = require('./bookData.json');
const mongoose = require('mongoose');
// const methodOverride = require('method-override');
const { NewBooks, EditorsChoice, LivesBooks, TopNovels, TerryPratchett } = require('./models/book');


mongoose.connect('mongodb://localhost:27017/booksApp')
.then(() => {
    console.log("MONGO CONNECTION OPEN!");
}).catch(err => {
    console.log("Oh no, Mongo connection lost");
    console.log(err);
})




app.use(express.static(path.join(__dirname, 'assets')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))



app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/rand', async (req, res) => {
    const dataOfNewBooks = await NewBooks.find({})
    const dataOfEditorsChoice = await EditorsChoice.find({})
    const dataOfLivesBooks = await LivesBooks.find({})
    const dataOfTopNovels = await TopNovels.find({})
    const dataOfPratchett = await TerryPratchett.find({})
    // console.log(dataOfNewBooks);
    res.render('random.ejs', { dataOfNewBooks, dataOfEditorsChoice, dataOfLivesBooks, dataOfTopNovels, dataOfPratchett })
    // res.render('random.ejs', { num })
})

app.get('/rand/:id', async (req, res) => {
    const { id, title } = req.params;
  
    const filter = { id: '_id' };
    let docs = await NewBooks.aggregate([
        { "$match": { "_id": mongoose.Types.ObjectId(id) } },
        { "$lookup": {from: 'EditorsChoice', localField: 'EditorsChoice.title', foreignField: '_id', as: 'users'}
        
        }
      
        //   { $match: { 
        //     // $expr: { $gt: [ { $size: '$status' }, 0] }
        //   } }
    ]);
    
    docs.length; // 1
    // docs[0].title; // 'Jean-Luc Picard'
    // docs[0].author // 59

    console.log(docs)

    // // `$match` is similar to `find()`
    // docs = await NewBooks.find(filter);
    // docs.length; // 1
    // docs[0].name; // 'Jean-Luc Picard'
    // docs[0].age // 59
    



// let docs =  await NewBooks.aggregate([
//     { $lookup: {
//                 from: "EditorsChoice",
//                 localField: "_id",
//                 foreignField: "_id",
//                 as: "EditorsChoice"
//                 }},
//     {
//       $group: {
//         // Each `_id` must be unique, so if there are multiple
//         // documents with the same age, MongoDB will increment `count`.
//         _id: '$_id',
//         title: { '$first': '$title' },
//         author: { '$first': '$author' },
//         isbn: { '$first': '$isbn' },
//         cover: { '$first': '$cover' },
//         count: { $sum: 1 }
//       }
//     },
//     // { $match: { _id: '$_id' } }
//   ]);
  
//   docs.length; // 4
// //   docs.sort((d1, d2) => d1._id - d2._id);
//   docs[0]; // { _id: 24, count: 1 }
//   docs[1]; // { _id: 28, count: 1 }
//   docs[2]; // { _id: 29, count: 2 }
//   docs[3]; // { _id: 59, count: 1 }


// console.log(docs) 
//    const bookFound = await docs.findById()
   
//    console.log(bookFound)
    // const editorsFound = await EditorsChoice.findById(id);
    // const livesFound = await LivesBooks.findById(id);
    // const topFOund = await TopNovels.findById(id);
    // const terryFound = await TerryPratchett.findById(id);
    
    res.render('single', { docs })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if(data){
    res.render('subreddit', { ...data })
    } else{
        res.render('notfound', { subreddit })
    }
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`Viewing ${postId} post on the ${subreddit} subreddit`)
})

app.get('/books', (req, res) => {
    var books = Object.values(bookData);
    console.log(books)
    res.render('books.ejs', { books })
})

app.post('/cats', (req, res) => {
    res.send('POST REQUEST TO /CATS')
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats.ejs', { cats })
})

app.get('/dogs', (req, res) => {
    res.send('WOOF!')
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    if(!q){
        res.send('Nothing found if nothing searched!')
    }
    res.send(`<h1>Search results for ${q}:</h1>`)
})

app.get('*', (req, res) => {
    res.send(`This page doesn't exist`)
})


app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})

