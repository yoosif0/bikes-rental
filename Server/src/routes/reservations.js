const reservationDb = require('../data-layer/reservation.db')
const successMessage = require('services/utility').successMessageWrapper
const reservationModel = require('models/reservation.model')


module.exports = {
    getReservationsForUser(req, res, next) {
        return reservationDb.getReseravtionsbyUserId(req.params.id, 10, req.query.skip ? parseInt(req.query.skip) : 0).then(x => res.status(200).json(x)).catch(err => next(err))
    },

    getReservationsForBike(req, res, next) {
        return reservationDb.getReseravtionsbyBikeId(req.query.bikeId, 10, req.query.skip ? parseInt(req.query.skip) : 0).then(x => res.status(200).json(x)).catch(err => next(err))
    },

    // getClashedReseravtionsForDateRange(req, res, next) {
    //     return reservationDb.getClashedReseravtionsForDateRange(req.query.startDate, req.query.endDate, 10, req.query.skip ? parseInt(req.query.skip) : 0).then(x => res.status(200).json(x)).catch(err => next(err))
    // },

    cancelReservation(req, res, next) {
        return reservationDb.deleteReservation(req.params.reservationId).then(item => item ? res.status(200).json(successMessage) : next({ nF: 'Meal' })).catch(err => next(err))
    },
    reserveBike(req, res, next) {
        return reservationDb.createReservation(req.decoded._id, req.body.bikeId, req.body.startDate, req.body.endDate).then(() => res.status(200).json(successMessage)).catch(err => next(err))
    },

    checkNoPreviousReservation(req, res, next) {
        return reservationDb.getReservationsForBikeAtCertainDateRange(req.params.bikeId, req.body.startDate, req.body.endDate, )
    },

    getReservations(req, res, next) {
        return Promise.all([
            reservationModel.find({}).limit(10).skip(req.query.skip ? parseInt(req.query.skip) : 0).populate('bikeId').exec(),
            reservationModel.find({}).count().lean().exec()
        ]).then(([items, count]) => res.status(200).json({ items, count })).catch(err => next(err))
    }
}



