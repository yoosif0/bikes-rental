const Joi = require('joi')

module.exports = {
    validateReserveBike(req, res, next) {
        if (new Date(req.body.startDate) >= new Date(req.body.endDate)) {
            return res.status(400).json({err: 'Please send an end date that is after the start date'})
        }
        const schema = Joi.object().keys({
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            bikeId: Joi.string().required()
        })
        return Joi.validate(req.body, schema, (err) => next(err))
    },

}
