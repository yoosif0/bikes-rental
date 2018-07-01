const reservationModel = require('../models/reservation.model')
const ObjectId = require('mongodb').ObjectID;


function reservationsForUser(query, skip) {
    return Promise.all([
        reservationModel.find(query).limit(10).skip(skip ? parseInt(skip) : 0).populate('bikeId').exec(),
        reservationModel.find(query).count().lean().exec()
    ]).then(([items, count]) => ({ items, count }))
}

function clearIrrelevantRatings(userId, items) {
    return items.map(item => {
        item.ratings = item.ratings.filter(rateObj => rateObj.userId.valueOf() == userId)
        if (item.ratings.length) {
            item.rate = item.ratings[0].rate
        }
        delete item.ratings
        return item
    })
}


module.exports = {
    createReservation(userId, bikeId, startDate, endDate) {
        const newReservation = new reservationModel({ userId, bikeId, startDate, endDate })
        return newReservation.save();
    },

    getMyUpcomingReservations(userId, skip) {
        const query = { userId, startDate: { $gte: Date() } }
        return reservationsForUser(query, skip)
    },

    getMyPastReservations(userId, skip) {
        const query = { userId, startDate: { $lt: Date() } }
        return reservationsForUser(query, skip)
    },

    getMyPreviouslyUsedBikes(userId, skip) {
        const basicBikeAggregation = [
            { $match: { userId: ObjectId(userId) } },
            { $group: { _id: "$bikeId", numberOfRides: { $sum: 1 } } },
        ]
        const countAggregation = [
            ...basicBikeAggregation,
            { $count: "count" },
        ]
        const paginatedDetailedAggregation = [
            ...basicBikeAggregation,
            {
                $lookup: {
                    from: "bikes",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bike"
                }
            },
            { $unwind: "$bike" },

            {
                $lookup: {
                    from: "ratings",
                    localField: "_id",
                    foreignField: "bikeId",
                    as: "ratings"
                }
            },
            // { $project: { numberOfRides: 1, bike: 1, _id: 0 } },
            { $skip: skip },
            { $limit: 10 }
        ]
        return Promise.all([
            reservationModel.aggregate(paginatedDetailedAggregation),
            reservationModel.aggregate(countAggregation)
        ]).then(([items, count]) => {
            items = clearIrrelevantRatings(userId, items)
            return { items, count: count[0].count }
        })
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
