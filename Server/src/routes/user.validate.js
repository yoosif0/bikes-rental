const Joi = require('joi')

module.exports = {
    validateUpdateUser(req, res, next) {
        if (req.decoded._id == req.params.id) {
            req.body.role = req.decoded.role
        }
        const schema = Joi.object().keys({
            name: Joi.string().min(3).max(20).required().label('name'),
            email: Joi.string().email().label('email'),
            role: Joi.string().required().label('role'),
        })
        return Joi.validate(req.body, schema, (err) => next(err))
    },



}
