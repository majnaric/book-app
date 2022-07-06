const { default: ObjectID } = require('bson-objectid');
const mongoose = require('mongoose');

const newBookSchema = new mongoose.Schema({
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
    },
    bookId: {
        type: Number
    },
    _id: {
        type: String
    }

})

const editorsChoiceSchema = new mongoose.Schema({
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
    },
    bookId: {
        type: Number
    }

})

const livesBooksSchema = new mongoose.Schema({
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
    },
    bookId: {
        type: Number
    }

})

const topNovelsSchema = new mongoose.Schema({
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
    },
    bookId: {
        type: Number
    }

})

const terryPratchettSchema = new mongoose.Schema({
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
    },
    bookId: {
        type: Number
    }

})

const allofthebooksSchema = new mongoose.Schema({
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
    },
    bookId: {
        type: Number
    },
    rowOfBooks:{
        type: String
    }

})



const NewBooks = mongoose.model('NewBooks', newBookSchema);
const EditorsChoice = mongoose.model('EditorsChoice', editorsChoiceSchema);
const LivesBooks = mongoose.model('LivesBooks', livesBooksSchema);
const TopNovels = mongoose.model('TopNovels', topNovelsSchema);
const TerryPratchett = mongoose.model('TerryPratchett', terryPratchettSchema);
const AllOfTheBooks = mongoose.model('allofthebooks', allofthebooksSchema);



module.exports = {
    NewBooks, EditorsChoice, LivesBooks, TopNovels, TerryPratchett, AllOfTheBooks }
