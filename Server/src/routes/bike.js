const s3Config = require('../config/s3.config')
const successMessage = require('services/utility').successMessageWrapper
const bikeDb = require('../data-layer/bike.db')
const reservationDb = require('../data-layer/reservation.db')
const GetDefaultQuery = require('data-layer/get-default-query.db')
const bikeModel = require('models/bike.model')
const aws = require('aws-sdk');
const s3 = new aws.S3();
s3.config.update({
    accessKeyId: s3Config.AWS_ACCESS_KEY,
    secretAccessKey: s3Config.AWS_SECRET_KEY,
    signatureVersion: 'v4',
});

module.exports = {
    deleteBike(req, res, next) {
        return bikeDb.deleteBike(req.params.bikeId).then(user => user ? res.status(200).json(successMessage) : next({ nF: 'Bike' })).catch(err => next(err))
    },
    addBike(req, res, next) {
        return bikeDb.createBike(req.body.model, req.body.weight, req.body.color, req.body.latitude, req.body.longitude, req.body.isAvailable, req.body.addressName)
            .catch(err => next(err)).then(res.status(200).json(successMessage))
    },

    getBike(req, res, next) {
        return bikeDb.getBikeById(req.params.bikeId)
            .catch(err => next(err)).then((x) => res.status(200).json(x))
    },

    updatebike(req, res, next) {
        return bikeDb.updateBike(req.params.bikeId, req.body.model, req.body.weight, req.body.color, req.body.latitude, req.body.longitude, req.body.isAvailable, req.body.addressName).then((user) => {
            return user ? res.status(200).json(successMessage) : next({ nF: 'Bike' })
        }).catch(err => next(err))
    },

    signImage(req, res) {
        // const filename = ;
        // const mimeType = req.query.contentType;
        // const ext = '.' + findType(mimeType);
        // const fileKey = filename;
        const params = {
            Bucket: s3Config.BUCKET,
            Key: req.query.imageName,
            Expires: 600,
            ACL: 'public-read-write'
        };
        return s3.getSignedUrl('putObject', params, (err, data) => (err) ? res.send(500, "Cannot create S3 signed URL"): res.json(data))
    },

    updateBikeImage(req, res, next) {
        bikeDb.updateBikeImage(req.query.bikeId, req.query.imageName).then((x)=>res.status(200).json(x)).catch(err => next(err))
    },

    getBikes(req, res, next) {
        const getDefaultQuery = new GetDefaultQuery(10, Number(req.query.skip || 0), bikeModel)
        return Promise.all([getDefaultQuery.getItems(), getDefaultQuery.getItemsCount()])
            .then(([bikes, count]) => res.status(200).json({ bikes, count })).catch(err => next(err))
    },

    getByLocationAndFilterExcludingReservedBikes(req, res, next) {
        return bikeDb.getByLocationAndFilterExcludingReservedBikes([], req.query.model, req.query.color,
                     Number(req.query.maxWeight), Number(req.query.minWeight), Number(req.query.longitude), Number(req.query.latitude),
                      Number(req.query.avgRate), req.query.isAvailable)
            .then(bikes => {
                return res.status(200).json(bikes)
            })
            .catch(err => next(err))
    },

    getWithPaginationExcludingReservedBikes(req, res, next) {
        return reservationDb.getClashedReseravtionsForDateRange(req.query.startDate, req.query.endDate)
            .then(reservations => {
                const reservedBikes = reservations.length ? reservations.map(item => item.bikeId) : null
                return bikeDb.getWithPaginationAndRatingExcludingReservedBikes(reservedBikes, req.query.model, req.query.color,
                    Number(req.query.maxWeight), Number(req.query.minWeight), 10, Number(req.query.skip || 0), Number(req.query.avgRate), req.query.isAvailable)
            })
            .then(bikes => {
                return res.status(200).json(bikes)
            })
            .catch(err => next(err))
    },

}


// function findType(string) {
//     var n = string.lastIndexOf('/');
//     return string.substring(n + 1);
// }
