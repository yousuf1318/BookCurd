const Joi = require("joi");
const { signupService } = require("../services");
const bcrypt = require('bcrypt');
const { createToken } = require('../lib/global')

const login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        loginType: Joi.number().default(1).allow(1, 2, 3).optional()
    });


    var validSchema = schema.validate({ ...req.body});

    // validating payload
    if (validSchema.error) {
        return res.status(400).json({
            message: validSchema.error.message || "Bad Request",
            code: 400
        })
    } else {
        validSchema = validSchema.value;
    }

    try {
        // validating user
        const user = await signupService.findOne({ email: validSchema.email })
        if (!user) {
            return res.status(404).send({
                message: "Incorrect usernamne or password!",
                code: 404
            });
        }

        // validating password
        const plainPass = await bcrypt.compare(validSchema.password, user.password);
        if (!plainPass) {
            return res.status(404).send({
                message: "Incorrect usernamne or password!",
                code: 404
            });
        }

        // generating jwt token;
        const tokenPayload = {
            email: user.email,
            userId: user._id,
            role: user.role,
            status: user.status,
            username:user.username
        }
        const token = await createToken(tokenPayload);
        const response = {
            token,
            role: user.role,
            status: user.status,
            userId: user._id,
            email: user.email,
            username:user.username

        }
        return res.status(200).send({
            message: "Login successfull!",
            data: response,
            status: 200
        })
    } catch (error) {
        console.log('error in creating token', error)
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        })
    }
}

module.exports = {
    login
}