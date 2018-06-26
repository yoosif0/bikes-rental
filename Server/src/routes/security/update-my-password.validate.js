const Joi = require('joi')
const passwordRegex = require('config/regexConstants').passwordRegex

module.exports = (req, res, next) => {
    const schema = Joi.object().keys({
        oldPassword: Joi.any(),
        newPassword: Joi.string().regex(passwordRegex).required().label('new password'),
    })
    return Joi.validate(req.body, schema, (err) => next(err))
}
