const bikeModel = require('../models/bike.model')

module.exports = {
    createBike(model, weight, color, latitude, longitude ) {
        const location = {
            coordinates:[latitude, longitude],
            type: 'Point',
        }
        const newBike = new bikeModel({ model, weight, color, location })
        return newBike.save()
    },

    deleteBike(_id) {
        return bikeModel.find({ _id }).remove()
    },

    updateBike(_id, model, weight, color, latitude, longitude) {
        const location = {
            coordinates:[latitude, longitude],
            type: 'Point',
        }
        return bikeModel.findOneAndUpdate({ _id }, { model, weight, color, location }, { new: true }).select('-__v')
    },

    updateBikeImage(_id, imageName) {
        return bikeModel.findOneAndUpdate({ _id }, { imageName }, { new: true }).select('-__v')
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