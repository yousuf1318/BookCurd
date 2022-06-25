// const { object } = require('joi');
const { number } = require('joi');
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    id:{
        type:Number
    },
    Name: {
        type: String,
    },
    Image_Url: [{
        type: String
    }],
    Author: {
        type: String
    },
    pages: {
        type: Number,
    },
    price: {
        type: Number
    },
    creationTs: {
        type: Date,
        default: Date.now,
        required: true

    },
    updatedTs: {
        type: Date,
        required: false,

    }
});

module.exports = mongoose.model('Books', bookSchema)


