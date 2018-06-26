const successMessage = require('services/utility').successMessageWrapper
const bikeDb = require('../data-layer/bike.db')

module.exports = {
    deleteBike(req, res, next) {
        return bikeDb.deleteBike(req.params.bikeId).then(user => user ? res.status(200).json(successMessage) : next({ nF: 'Bike' })).catch(err => next(err))
    }
}