const jwt = require('jsonwebtoken');

module.exports.PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/

module.exports.createToken = (data) => {
    return jwt.sign(
        data, 
        process.env.SECRETE_KEY, 
        { expiresIn: 60 * 60 * 24 }
    )
    
}