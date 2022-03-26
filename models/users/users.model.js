const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = Schema({
    full_name:{
        type: String,
        required: false
    },
    address:{ 
        type: String,
        required: false
    }, 
    email:{ 
        type: String,
        required: false
    },
    password:{
        type: String,
        required: false
    },
    token:{ 
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

module.exports = mongoose.model('users', UsersSchema);