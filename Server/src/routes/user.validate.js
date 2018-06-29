const Joi = require('joi')

module.exports = {
    validateUpdateUser(req, res, next) {
        const schema = req.decoded.role === 'manager' ?
            Joi.object().keys({
                name: Joi.string().min(3).max(20).required().label('name'),
                email: Joi.string().email().label('email'),
                role: Joi.string().label('role'),
            })
            : Joi.object().keys({
                name: Joi.string().min(3).max(20).required().label('name'),
                email: Joi.string().email().label('email'),
            })
        return Joi.validate(req.body, schema, (err) => next(err))
    },



}
