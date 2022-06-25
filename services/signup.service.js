const Users = require('../models/Users');

const post = (payload) => Users.create(payload);
const findOne = condition => Users.findOne(condition);
const find = (condition, options) => Users.findOne(condition).select(options);
const get = (condition, options) => Users.find(condition).skip(options.skip).limit(options.limit).select('-__v');
const count = (condition) => Users.count(condition)


module.exports = {
    post,
    findOne,
    get,
    count,
    find
}
