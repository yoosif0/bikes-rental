const reservationModel = require('../models/reservation.model')

module.exports = {
    createReservation(userId, bikeId, startDate, endDate) {
        const newReservation = new reservationModel({ userId, bikeId, startDate, endDate })
        return newReservation.save();
    },

    getReservationsForABikeAtCertainDateRange(bikeId, startDate, endDate) {
        reservationModel.aggregate([
            { $match: { bikeId } },
            {
                "$redact": {
                    "$cond": [
                        {
                            "$or": [
                                {
                                    "$and": [
                                        { "$gte": ["$startDate", new Date(startDate)] } ,
                                        { "$lt": ["$date", new Date(endDate)] } ,
                                    ],
                                    "$and":[
                                        { "$gte": ["$date", new Date(startDate)] } ,
                                        { "$lt": ["$date", new Date(endDate)] } ,
                                    ]
                                }
                            ]
                        },
                        "$$KEEP",
                        "$$PRUNE"
                    ]
                }
            },

        ])
    },

    deleteReservation(_id) {
        return reservationModel.find({ _id }).remove()
    },

    getReservation(_id) {
        return reservationModel.find({ _id }).lean().exec()
    },

    getReseravtionsbyUserId(_id, limit, skip) {
        return Promise.all([reservationModel.find({ _id }).limit(limit).skip(skip).lean().exec(), reservationModel.find({ _id }).count().lean().exec()])
    }
}
