
const AppSetting = require("../models/AppSetting");

const findOne = (condition) => AppSetting.findOne(condition).select('-__v');
const update = (condition, payload) => AppSetting.findOneAndUpdate(condition, payload, {upsert: true});

module.exports = {
    findOne,
    update
}