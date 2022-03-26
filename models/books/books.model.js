const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksSchema = Schema({
    book_number:{
        type: String,
        required: false
    },
    book_title:{ 
        type: String,
        required: false
    }, 
    author:{ 
        type: String,
        required: false
    },
    publication_year:{
        type: Number,
        required: false
    },
    publisher:{
        type: String,
        required: false
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    updated_at:{
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('books', BooksSchema);