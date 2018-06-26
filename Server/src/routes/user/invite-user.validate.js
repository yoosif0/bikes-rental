const Joi = require('joi')

module.exports =  (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().required().email().label('email'),
        url: Joi.string().required().uri().label('url')
    })
    return Joi.validate(req.body, schema , (err) => next(err))
}