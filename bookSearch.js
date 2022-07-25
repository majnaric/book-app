const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const assert = require('assert');
// const methodOverride = require('method-override');
const { AllOfTheBooks } = require('./models/book');

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



// const search = document.querySelector('#bookSearch');

// async function bookSearch(){
//     search.addEventListener('click', () => {
//         const searchData = search.value;
//         console.log(searchData);
//     })

// }



// module.exports = bookSearch();