const addRecord = require('data-layer/record/add-record.db')
const successMessage = require('services/utility').successMessageWrapper


module.exports = (req, res, next) => {
    return addRecord(req.body.model, req.body.weight, req.body.color, req.body.location)
        .catch(err => next(err)).then((x) => x ? res.status(200).json(successMessage) : next({ nF: 'User' }))
}


