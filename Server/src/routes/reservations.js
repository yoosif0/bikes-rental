const reservationDb = require('../data-layer/reservation.db')
const successMessage = require('services/utility').successMessageWrapper
// const reservationModel = require('models/reservation.model')


module.exports = {

    getReservationsForBike(req, res, next) {
        return reservationDb.getReseravtionsbyBikeId(req.query.bikeId, 10, Number(req.query.skip || 0)).then(x => res.status(200).json(x)).catch(err => next(err))
    },

    cancelReservation(req, res, next) {
        return reservationDb.deleteReservation(req.params.reservationId).then(item => item ? res.status(200).json(successMessage) : next({ nF: 'Meal' })).catch(err => next(err))
    },
    reserveBike(req, res, next) {
        return reservationDb.createReservation(req.decoded._id, req.body.bikeId, req.body.startDate, req.body.endDate).then(() => res.status(200).json(successMessage)).catch(err => next(err))
    },

    checkNoPreviousReservation(req, res, next) {
        return reservationDb.getReservationsForBikeAtCertainDateRange(req.params.bikeId, req.body.startDate, req.body.endDate, )
    },

    getPastReservationsForUser(req, res, next) {
        return reservationDb.getPastReservationsForUser(req.params.id, Number(req.query.skip || 0)).then(payload=>res.status(200).json(payload)).catch(err => next(err))
    },

    getUpcomingReservationsForUser(req, res, next) {
        return reservationDb.getUpcomingReservationsForUser(req.params.id, Number(req.query.skip || 0)).then(payload=>res.status(200).json(payload)).catch(err => next(err))
    },

    getMyPreviouslyUsedBikes(req, res, next) {
        return reservationDb.getMyPreviouslyUsedBikes(req.decoded._id, Number(req.query.skip || 0)).then(payload=>res.status(200).json(payload)).catch(err => next(err))
    },
    getBikeReservations(req, res, next) {
        return reservationDb.getBikeReservations(req.params.bikeId, Number(req.query.skip || 0)).then(payload=>res.status(200).json(payload)).catch(err => next(err))
    }
}

