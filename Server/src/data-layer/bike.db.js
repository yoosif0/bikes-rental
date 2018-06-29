const bikeModel = require('../models/bike.model')
// const faker = require('faker')

module.exports = {
    createBike(model, weight, color, latitude, longitude) {
        const location = {
            coordinates: [longitude, latitude ],
            type: 'Point',
        }
        const newBike = new bikeModel({ model, weight, color, location })
        return newBike.save()
    },

    getByLocation(long, lat, distance = 5000000) {
        return bikeModel.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [long, lat] }, $maxDistance: distance } } }).limit(20).lean().exec()
    },

    deleteBike(_id) {
        return bikeModel.find({ _id }).remove()
    },

    updateBike(_id, model, weight, color, latitude, longitude) {
        const location = {
            coordinates: [latitude, longitude],
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

// for (let i = 0; i < 5000; i++) {
//     const model = faker.name.firstName()
//     const latitude = faker.address.latitude()
//     const longitude = faker.address.longitude()
//     const color = faker.random.arrayElement(['red', 'blue', 'black', 'yellow', 'green', 'white'])
//     const weight = faker.random.number({ min: 10, max: 50 })
//     module.exports.createBike(model, weight, color, latitude, longitude).then(x=>{
//         console.log('su')
//     })
// }