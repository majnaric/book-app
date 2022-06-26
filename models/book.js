const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
    require: true
    },
    author: {
        type: String
    },
    category: {
        type: String
    },
    cover: {
        type: String
    },
    pages: {
        type: Number
    },
    isbn: {
        type: Number
    }

})

const NewBooks = mongoose.model('NewBooks', bookSchema);


module.exports = NewBooks;
