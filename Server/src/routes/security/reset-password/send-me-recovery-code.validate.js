const Joi = require('joi')

module.exports = (req, res, next) => {
    const schema = Joi.string().email().required().label('email')
    return Joi.validate(req.body.email, schema, (err) => next(err))
}