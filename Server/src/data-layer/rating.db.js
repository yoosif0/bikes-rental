const ratingModel = require('../models/rating.model')

module.exports = {
    createOrUpdateRating(userId, bikeId, rate) {
        return ratingModel.update( { userId, bikeId }, { userId, bikeId, rate }, { upsert : true })
    },

    getRatingsForSeveralBikesForOneUser(userId, bikes) {
        
    }

}