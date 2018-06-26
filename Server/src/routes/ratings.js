const ratingsDb = require('../data-layer/rating.db')
const successMessage = require('services/utility').successMessageWrapper


module.exports = {
    // getRatingsForSeveralBikes(req, res, next) {
    //     ratingsDb.getRatingsForSeveralBikes(req.params.id, 10, req.query.skip ? parseInt(req.query.skip) : 0).then(x => res.status(200).json(x)).catch(err => next(err))
    // },
    
    rateBike(req, res, next) {
        ratingsDb.createRating(req.params.id, req.params.bikeId, req.params.rate).then(()=> res.status(200).json(successMessage)).catch(err => next(err))
    }
}



