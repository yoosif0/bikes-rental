const Joi = require('joi')

module.exports = (req, res, next) => {
    const schema = Joi.object().keys({
        model: Joi.string().required().label('model'),
        weight: Joi.number().required().label('weight'),
        color: Joi.string().required().label('color'),
        location_coordinates: Joi.array().required().label('location_coordinates')
    })
    return Joi.validate(req.body, schema, (err) => next(err))
}