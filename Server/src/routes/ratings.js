const ratingsDb = require('../data-layer/rating.db')
const successMessage = require('services/utility').successMessageWrapper


module.exports = {
    getRatingsForSeveralBikesForOneUser(req, res, next) {
        ratingsDb.getRatingsForSeveralBikesForOneUser(req.params.id, 10, Number(req.query.skip || 0)).then(x => res.status(200).json(x)).catch(err => next(err))
    },
    
    rateBike(req, res, next) {
        ratingsDb.createOrUpdateRating(req.decoded._id, req.params.bikeId, req.params.rate).then(()=> res.status(200).json(successMessage)).catch(err => next(err))
    },

    
}



