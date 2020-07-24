const ratingsDb = require('../data-layer/rating.db')
const successMessage = require('services/utility').successMessageWrapper


module.exports = {    
    rateBike(req, res, next) {
        ratingsDb.createOrUpdateRating(req.decoded._id, req.params.bikeId, req.params.rate).then(()=> res.status(200).json(successMessage)).catch(err => next(err))
    },
}



