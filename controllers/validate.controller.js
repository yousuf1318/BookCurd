const Joi = require("joi");
const { userService } = require("../services");

const emailValidate = async(req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required()
    })
    let schemaValidator = schema.validate(req.body);
    if(schemaValidator.error){
        return res.status(400).json({
            message: schemaValidator.error.message || "Bad Request",
            code: 400
        })
    }else{
        schemaValidator = schemaValidator.value;
    }

    try{
        // validatinng for existing user
        const conditions = {email: schemaValidator.email};
        const existingUser = await userService.findOne(conditions);
        if(existingUser){
            return res.status(409).json({
                message: "User already exists!",
                status: 409
            })
        }
        return res.status(200).send({
            message: 'valid email!',
            status: 200
        });
    }
    catch(error){
        console.log('Caught Error', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }

}

module.exports = {
    emailValidate
}