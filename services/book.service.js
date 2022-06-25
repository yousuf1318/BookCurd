const Books = require('../models/book');

const post = (payload) => Books.create(payload);
const findOne = condition => Books.findOne(condition);
const find = (condition, options) => Books.findOne(condition).select(options);
const get = ( options) => Books.find().skip(options.skip).limit(options.limit).select('-__v');
const count = (condition) => Books.count(condition)

module.exports = {
    post,
    findOne,
    get,
    count,
    find,
}
