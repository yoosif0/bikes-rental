const bikeModel = require('../models/bike.model')
// const faker = require('faker')
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    createBike(model, weight, color, latitude, longitude) {
        const location = {
            coordinates: [longitude, latitude],
            type: 'Point',
        }
        const newBike = new bikeModel({ model, weight, color, location })
        return newBike.save()
    },

    getByLocationAndFilterExcludingReservedBikes(excludedIds, model, color, maxWeight, minWeight, long, lat, distance = 5000000) {
        const query = getQuery(excludedIds, model, color, maxWeight, minWeight)
        query.location = { $nearSphere: { $geometry: { type: "Point", coordinates: [long, lat] }, $maxDistance: distance } }
        return bikeModel.find(query).limit(20).lean().exec()
    },

    getWithPaginationExcludingReservedBikes(excludedIds, model, color, maxWeight, minWeight, limit, skip) {
        const query = getQuery(excludedIds, model, color, maxWeight, minWeight)
        return Promise.all([bikeModel.find(query).limit(limit).skip(skip).lean().exec(), bikeModel.find(query).count().lean().exec()]).then(([bikes, count])=>({bikes, count}))
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



}

function getQuery (excludedIds, model, color, maxWeight, minWeight) {
    const query =  {  }
    if(model) {
        query.model = { $regex: RegExp(`.*${model}.*`) }
    }
    if(excludedIds) {
        query._id = { $nin: excludedIds.map(id => ObjectId(id)) }
    }
    if(color) {
        query.color = color
    }
    if(maxWeight || minWeight) {
        query.weight = { $gte: minWeight || 0, $lte: maxWeight || Infinity }
    }
    return query
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