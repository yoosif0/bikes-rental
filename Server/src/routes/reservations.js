const reservationDb = require('../data-layer/reservation.db')
const successMessage = require('services/utility').successMessageWrapper
const GetDefaultQuery = require('data-layer/get-default-query.db')
const reservationModel = require('models/reservation.model')


module.exports = {
    getReservationsForUser(req, res, next) {
        reservationDb.getReseravtionsbyUserId(req.params.id, 10, req.query.skip ? parseInt(req.query.skip) : 0).then(x => res.status(200).json(x)).catch(err => next(err))
    },

    cancelReservation(req, res, next) {
        reservationDb.deleteReservation(req.params.reservationId).then(item => item ? res.status(200).json(successMessage) : next({ nF: 'Meal' })).catch(err => next(err))
    },

    reserveBike(req, res, next) {
        reservationDb.createReservation(req.params.id, req.params.bikeId, req.body.startDate, req.body.endDate).then(() => res.status(200).json(successMessage)).catch(err => next(err))
    },

    checkNoPreviousReservation(req, res, next) {
        reservationDb.getReservationsForBikeAtCertainDateRange(req.params.bikeId, req.body.startDate, req.body.endDate, )
    },

    getReservations(req, res, next) {
        const getDefaultQuery = new GetDefaultQuery(10, req.query.skip ? parseInt(req.query.skip) : 0, reservationModel)
        return Promise.all([getDefaultQuery.getItems(), getDefaultQuery.getItemsCount()])
            .then(([items, count]) => res.status(200).json({ items, count })).catch(err => next(err))
    }
}



