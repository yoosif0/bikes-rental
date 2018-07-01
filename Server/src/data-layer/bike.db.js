const bikeModel = require('../models/bike.model')
const ObjectId = require('mongodb').ObjectID;

const aggregationStore = {
    ratingLookupAggregation: {
        $lookup: {
            from: "ratings",
            localField: "_id",
            foreignField: "bikeId",
            as: "ratings"
        }
    },
}
function getAverageRate(items) {
    return items.map(item => {
        if (item.ratings.length) {
            item.rate = item.ratings.reduce((cum, current) => cum + current.rate, 0) / item.ratings.length
        }
        delete item.ratings
        return item
    })
}
module.exports = {
    createBike(model, weight, color, latitude, longitude) {
        const location = {
            coordinates: [longitude, latitude],
            type: 'Point',
        }
        const newBike = new bikeModel({ model, weight, color, location })
        return newBike.save()
    },

    getByLocationAndFilterExcludingReservedBikes(excludedIds, model, color, maxWeight, minWeight, long, lat) {
        const query = getQuery(excludedIds, model, color, maxWeight, minWeight)
        const aggregationArr = [
            {
                $geoNear: {
                    spherical: true,
                    query,
                    near: { type: "Point", coordinates: [Number(long), Number(lat)] },
                    distanceField: "dist.calculated",
                    maxDistance: 5000000,
                    limit: 20,
                }
            },
            aggregationStore.ratingLookupAggregation,
        ]
        return bikeModel.aggregate(aggregationArr).then((items) => getAverageRate(items))
    },

    getWithPaginationAndRatingExcludingReservedBikes(excludedIds, model, color, maxWeight, minWeight, limit, skip) {
        const basicBikeAggregation = [
            { $match: getQuery(excludedIds, model, color, maxWeight, minWeight) },
        ]
        const paginatedDetailedAggregation = [
            ...basicBikeAggregation,
            aggregationStore.ratingLookupAggregation,
            { $skip: skip },
            { $limit: 10 }
        ]
        const countAggregation = [
            ...basicBikeAggregation,
            { $count: "count" },
        ]

        return Promise.all([
            bikeModel.aggregate(paginatedDetailedAggregation),
            bikeModel.aggregate(countAggregation)
        ]).then(([items, count]) => {
            items = getAverageRate(items)
            return { items, count: count.length? count[0].count: 0 }
        })
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

function getQuery(excludedIds, model, color, maxWeight, minWeight) {
    const query = {}
    if (model) {
        query.model = { $regex: RegExp(`.*${model}.*`) }
    }
    if (excludedIds) {
        query._id = { $nin: excludedIds.map(id => ObjectId(id)) }
    }
    if (color) {
        query.color = color
    }
    if (maxWeight || minWeight) {
        query.weight = { $gte: minWeight || 0, $lte: maxWeight || Infinity }
        console.log(query)
    }
    return query
}
