const bikeModel = require('models/bike.model')
const ObjectId = require('mongodb').ObjectID;
const reservationModel = require('models/reservation.model')


module.exports = (limit, skip, startDate, endDate) => {
    reservationModel.find({
        startDate: startDate ? { "$gte": ["$date", new Date(startDate)] } : {},
        endDate: endDate ? { "$lt": ["$date", new Date(endDate)] } : {},
    })
    return bikeModel.aggregate([
        {
            $match: {
                startDate: startDate ? { "$gte": ["$date", new Date(startDate)] } : {},
                endDate: endDate ? { "$lt": ["$date", new Date(endDate)] } : {},
            }

        },

        {
            $facet: {
                bikes: [
                    // { $sort: { date: -1 } },
                    { $skip: skip },
                    { $limit: limit },
                ],
                pageInfo: [
                    { $group: { _id: null, count: { $sum: 1 } } },
                ],
            },
        },
    ]
    ).exec().then(x => {
        return {
            x

            // meals: x[0].meals,
            // count: x[0].pageInfo[0] ? x[0].pageInfo[0].count : 0,
            // skip,
            // limit
        }
    })
}
