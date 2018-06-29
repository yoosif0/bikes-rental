const reservationModel = require('../models/reservation.model')

module.exports = {
    createReservation(userId, bikeId, startDate, endDate) {
        const newReservation = new reservationModel({ userId, bikeId, startDate, endDate })
        return newReservation.save();
    },

    getClashedReseravtionsForDateRange(startDate, endDate) {
        return reservationModel.aggregate([
            {
                $match: {
                    $or: [
                        { "startDate": { "$gte": new Date(startDate), "$lte": new Date(endDate) } },
                        { "endDate": { "$gte": new Date(startDate), "$lte": new Date(endDate) } },

                    ]
                }
            },
            
            // { $lookup: { from: "bikes", localField: "bikeId", foreignField: "_id", as: "bike" } },


            // {
            //     "$redact": {
            //         "$cond": [
            //             {
            //                 "$or": [
            //                     {
            //                         "$and": [
            //                             { "$gte": [new Date(startDate), "$startDate" ] } ,
            //                             { "$lte": [new Date(startDate), "$endDate" ] } ,
            //                         ],
            //                         // "$and": [
            //                         //     { "$gte": [new Date(endDate), "$startDate" ] } ,
            //                         //     { "$lte": [new Date(endDate), "$endDate" ] } ,
            //                         // ],
            //                         // "$and": [
            //                         //     { "$lte": [new Date(startDate), "$startDate", ] } ,
            //                         //     { "$gte": [new Date(endDate), "$endDate", ] } ,
            //                         // ],
            //                     }
            //                 ]
            //             },
            //             "$$KEEP",
            //             "$$PRUNE"
            //         ]
            //     }
            // },

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
    },

    getReseravtionsbyBikeId(bikeId, limit, skip) {
        return Promise.all([reservationModel.find({ bikeId }).limit(limit).skip(skip).lean().exec(), reservationModel.find({ bikeId }).count().lean().exec()])
    },

    // getReseravtionsForDate(startDate, endDate, limit, skip) {
    //     return Promise.all([reservationModel.find({ bikeId }).limit(limit).skip(skip).lean().exec(), reservationModel.find({ bikeId }).count().lean().exec()])
    // }
}
