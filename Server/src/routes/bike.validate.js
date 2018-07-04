const Joi = require('joi')

module.exports = {
    bikeFormSchema(req, res, next) {
        const schema = Joi.object().keys({
            model: Joi.string().required().label('model'),
            weight: Joi.number().required().label('weight'),
            addressName: Joi.string().required().label('addressName'),
            color: Joi.string().required().label('color'),
            longitude: Joi.number().max(180).min(-180).required().label('longitude'),
            latitude: Joi.number().max(90).min(-90).required().label('latitude'),
            isAvailable: Joi.bool().required().label('isAvailable'),
        })
        return Joi.validate(req.body, schema, (err) => next(err))
    }
}

