const Joi = require('joi')
const passwordRegex = require('config/regexConstants').passwordRegex

module.exports = (req, res, next) => {
    let loginErr = new Error('Email or/and password are wrong')
    const schema = Joi.object().keys({
        password: Joi.string().regex(passwordRegex).required().label('password'),
        email: Joi.string().email().required().label('email')
    })
    return Joi.validate(req.body, schema, err => err ? res.status(401).json({code: 2, msg: loginErr.message}) : next())
}