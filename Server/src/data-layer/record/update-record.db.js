const bikeModel = require('models/bike.model')

module.exports = (_id, model, weight, color, location) => {
    return bikeModel.findOneAndUpdate({ _id }, {model, weight, color, location}, { new: true }).select('-__v')

}


