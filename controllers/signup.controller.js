
const { query, response } = require('express');
const Joi = require('joi');
const { signupService } = require("../services")
const bcrypt = require('bcrypt');
const saltRounds = 10;


const createUser = async (req, res) => {
    let bodyData = (req.body || {})
    let query = (req.query || {})
    const schema = Joi.object({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        username: Joi.string().required(),
        phoneNumber: Joi.number().allow(null, ""),
        role: Joi.string().default('USER').allow("USER", "ADMIN"),
    })
    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(400).json({ message: schemaValidator.error.message || 'Bad Request!', code: 400 })
    } else {
        schemaValidator = schemaValidator.value
    }
    try {
        const conditions = {
            email: schemaValidator.email
        }
        const existingUser = await signupService.findOne(conditions);
        // console.log(existingUser)
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists!",
                status: 409
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!",
            status: 500
        })
    }
    let payload = {};
    const encryptedPass = await bcrypt.hash(schemaValidator.password, saltRounds);
    payload['password'] = encryptedPass;

    const userData = {
        ...schemaValidator,
        ...payload
    }

    // return
    new Promise((resolve, reject) => {
        resolve(signupService.post(userData))
    }
    )
        .then(data => {
            // res.send(data)
            return res.status(201).json({
                message: 'New user created successfully!',
                status: 201,
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error',
                status: 500
            })
        })
}





const getUsers = async (req, res) => {
    const schema = Joi.object({
        status: Joi.number().default(1),
        limit: Joi.number().default(10),
        skip: Joi.number().default(0),
        searchText: Joi.string().default('').allow(null, ''),
        userId: Joi.string()
    })
    let query = schema.validate(req.query);
    if (query.error) {
        return res.status(400).json({ message: query.error.message || 'Bad Request!', code: 400 })
    } else {
        query = query.value;
    }
    let conditions;
    let page;
    if (query.userId) {
        conditions = {
            _id: query.userId,
            role: "USER"
        }
    } else {
        conditions = {
            status: query.status,
            role: "USER",
            $or: [
                { firstName: { $regex: query.searchText } },
                { lastName: { $regex: query.searchText } },
                { email: { $regex: query.searchText } },
                { phoneNumber: { $regex: query.searchText } },
                { city: { $regex: query.searchText } },
                { country: { $regex: query.searchText } },
                { addressLine1: { $regex: query.searchText } },
                { state: { $regex: query.searchText } }
            ]
        }
        page = {
            limit: query.limit,
            skip: query.skip
        }
    }

    const project = {
        password: 0,
        __v: 0
    }
    const sort = { _id: -1 }
    try {
        const result = await signupService.get(conditions, project, page, sort);
        const count = await signupService.count(conditions);
        if (!count || !result.length) {
            return res.status(204).json({
                message: 'No data found!',
                status: 204
            })
        }
        res.status(200).json({
            message: 'Success',
            status: 200,
            totalCount: count,
            data: result
        })
    }
    catch (err) {
        console.log(err)
        res.json({ message: err, status: 500 })
    }

}

const arrayOfNumbers = [1, 2, 3, 4];
const data=arrayOfNumbers.reduce((accumulator, currentValue, index, array) => array[index] = array[index] * 2)
console.log(data)
module.exports = {
    createUser,
    getUsers,
}