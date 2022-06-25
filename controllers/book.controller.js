
const Joi = require('joi');
const { bookService } = require("../services")


const createBook = async (req, res) => {
    let bodyData = (req.body || {})
    let query = (req.query || {})
    const schema = Joi.object({
        id: Joi.string().required(),
        Name: Joi.string().required(),
        Image_Url: Joi.string().required(),
        Author: Joi.string().required(),
        pages: Joi.number().min(1).required(),
        price: Joi.number().required(),
    })
    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(400).json({ message: schemaValidator.error.message || 'Bad Request!', code: 400 })
    } else {
        schemaValidator = schemaValidator.value
    }
    try {
        const conditions = {
            id: schemaValidator.id
        }
        const existingBook = await bookService.findOne(conditions);
        // console.log(existingUser)
        if (existingBook) {
            return res.status(409).json({
                message: "This book is already exists!",
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

    const bookData = {
        ...schemaValidator,
    }

    // return
    new Promise((resolve, reject) => {
        resolve(bookService.post(bookData))
    }
    )
        .then(data => {
            // res.send(data)
            return res.status(201).json({
                message: 'New Book created successfully!',
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





const getBook = async (req, res) => {

    const schema = Joi.object({
        limit: Joi.number().default(10),
        skip: Joi.number().default(0),
        searchText: Joi.string().default('').allow(null, '')
    });

    let query = schema.validate(req.query);

    if (query.error) {
        return res.status(400).json({ message: query.error.message || 'Bad Request!', code: 400 })
    } else {
        query = query.value;
    }


    let page;
    page = {
        limit: query.limit,
        skip: query.skip
    }

    const sort = { _id: -1 }
    try {
        const result = await bookService.get(page, sort);
        const count = await bookService.count();
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





const updateBook = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.string().required()
    })
    const validateSchema = schema.validate(req.body);
    let reqPayload;
    // validating payload
    if (validateSchema.error) {
        return res.status(400).json({
            message: validateSchema.error.message || "Bad Request",
            code: 400
        })
    } else {
        reqPayload = validateSchema.value;
    }
    // res.send(reqPayload)
    try {
        // validatinng for existing Book
        const existingBook = await bookService.findOne({ _id: ObjectId(reqPayload._id) });
        if (!existingBook) {
            return res.status(204).json({
                message: "Book with this id doesn't exist!",
                status: 204
            })
        }
    

        //  adding a new Book
        const filter = { _id: ObjectId(reqPayload._id) }
        // const payload = {status: reqPayload.status}
        const result = await langService.update(filter);
        res.status(201).send({
            message: "Book updated successfully!",
            status: 201
        })
    }
    catch (error) {
        console.log('Caught Error', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }
}






const deleteBook = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.string().required()
    })
    const validateSchema = schema.validate(req.body);
    let reqPayload;
    // validating payload
    if (validateSchema.error) {
        return res.status(400).json({
            message: validateSchema.error.message || "Bad Request",
            code: 400
        })
    } else {
        reqPayload = validateSchema.value;
    }

    try {
        // validatinng for existing Book
        const existingBook = await bookService.findOne({ _id: ObjectId(reqPayload._id) });
        if (!existingBook) {
            return res.status(204).json({
                message: "Book with this id doesn't exist!",
                status: 204
            })
        }

        // Delete  Book
        const filter = { _id: ObjectId(reqPayload._id) }
        const result = await bookService.deleteOne(filter);
        res.status(201).send({
            message: "Book deleted successfully!",
            status: 201
        })
    }
    catch (error) {
        console.log('Caught Error', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }
}

module.exports = {
    createBook,
    getBook,
    updateBook,
    deleteBook,

}