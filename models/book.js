const { default: ObjectID } = require('bson-objectid');
const mongoose = require('mongoose');



const allofthebooksSchema = new mongoose.Schema({
    title: {
      type: String,
    require: true
    },
    author: [{
        type: String
    }],
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
        type: String
    },
    bookId: {
        type: Number
    },
    rowOfBooks:{
        type: String
    },
    genre:[{
        type: String
    }], 

})


const AllOfTheBooks = mongoose.model('allofthebooks', allofthebooksSchema);



module.exports = { AllOfTheBooks }
