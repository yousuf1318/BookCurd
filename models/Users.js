const { date } = require('joi');
const mongoose = require('mongoose');

const createUserSchema = mongoose.Schema({
    username: {
        type: String,
        reqired: true
    },
    firstName: {
        type: String,
        reqired: false
    },
    lastName: {
        type: String,
        reqired: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: false
    },

    role: {
        type: String,
        required: true,
        default: "USER",
        enum: ["USER", "ADMIN"]
    },

    password: {
        type: String,
        required: true
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

module.exports = mongoose.model('user', createUserSchema)


