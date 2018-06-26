
const updateRecord = require('data-layer/record/update-record.db')
const successMessage = require('services/utility').successMessageWrapper

module.exports = (req, res, next) => {
    return updateRecord(req.params.id, req.body.model, req.body.weight, req.body.color, req.body.location).then((user) => {
        return user ? res.status(200).json(successMessage) : next({ nF: 'Bike' })
    }).catch(err => next(err))
}
