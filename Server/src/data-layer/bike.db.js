const bikeModel = require('../models/bike.model')

module.exports = {
    createBike(bike) {
        const newBike = new bikeModel(bike)
        return newBike.save();
    },

    deleteBike(_id) {
        return bikeModel.find({  _id }).remove()
    },

    updateBike(_id, payload) {
        return bikeModel.findOneAndUpdate({ _id }, payload, { new: true }).select('-password -__v')
    },

    getBikeById(id) {
        return bikeModel.findById(id).exec()
    },
    // getAvailableBikes(startDate, endDate) {
    //     {
    //         $facet: {
    //             meals: [
    //                 { $sort : { date : -1 } },
    //                 { $skip: skip },
    //                 { $limit: limit },
    //             ],
    //             pageInfo: [
    //                 { $group: { _id: null, count: { $sum: 1 } } },
    //             ],
    //         },
    //     },

    // }
}