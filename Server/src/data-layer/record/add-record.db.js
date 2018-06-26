const bikeModel = require('models/bike.model')

module.exports = (model, weight, color, location) => {
    const newBike = new bikeModel({model, weight, color, location})
    return newBike.save()
}