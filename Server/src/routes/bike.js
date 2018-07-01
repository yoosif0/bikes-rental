const s3Config = require('../config/s3.config')
const successMessage = require('services/utility').successMessageWrapper
const bikeDb = require('../data-layer/bike.db')
const reservationDb = require('../data-layer/reservation.db')
const GetDefaultQuery = require('data-layer/get-default-query.db')
const bikeModel = require('models/bike.model')
const ObjectId = require('mongodb').ObjectID;
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
        return bikeDb.createBike(req.body.model, req.body.weight, req.body.color, req.body.latitude, req.body.longitude)
            .catch(err => next(err)).then(res.status(200).json(successMessage))
    },

    getBike(req, res, next) {
        return bikeDb.getBikeById(req.params.bikeId)
            .catch(err => next(err)).then((x) => res.status(200).json(x))
    },

    updatebike(req, res, next) {
        return bikeDb.updateBike(req.params.bikeId, req.body.model, req.body.weight, req.body.color, req.body.latitude, req.body.longitude).then((user) => {
            return user ? res.status(200).json(successMessage) : next({ nF: 'Bike' })
        }).catch(err => next(err))
    },

    getBikesExcludingSome(req, res, next) {
        excludedBikes = []
        const getDefaultQuery = new GetDefaultQuery(10, req.query.skip ? parseInt(req.query.skip) : 0,
            bikeModel, { _id: { $nin: [ObjectId("5b31e3eff63d0612ac8359f9")] } })
        return getDefaultQuery.getItems().then(x => res.status(200).json(x))
    },

    // getNearbyBikesByLocation(req, res){
    //     return bikeDb.getByLocation(req.query.longitude, req.query.latitude).then(bikes=>res.status(200).json(bikes)).catch(err=>res.status(400).json(err))
    // },

    signImage(req, res) {
        const filename = req.query.bikeId + req.query.objectName;
        // const mimeType = req.query.contentType;
        // const ext = '.' + findType(mimeType);
        // const fileKey = filename;


        const params = {
            Bucket: s3Config.BUCKET,
            Key: filename,
            Expires: 600,
            ACL: 'public-read-write'
        };

        return s3.getSignedUrl('putObject', params, (err, data) => (err) ? res.send(500, "Cannot create S3 signed URL") :
            bikeDb.updateBikeImage(req.query.bikeId, filename).then((x) => res.json(data)).catch(err => res.status(400).json(err)))
    },

    getBikes(req, res, next) {
        // return getRecords(10, req.query.skip ? parseInt(req.query.skip) : 0, req.query.startDate, req.query.endDate).then(x => res.status(200).json(x)).catch(err => next(err))

        const getDefaultQuery = new GetDefaultQuery(10, req.query.skip ? parseInt(req.query.skip) : 0, bikeModel)
        return Promise.all([getDefaultQuery.getItems(), getDefaultQuery.getItemsCount()])
            .then(([bikes, count]) => res.status(200).json({ bikes, count })).catch(err => next(err))
    },

    getByLocationAndFilterExcludingReservedBikes(req, res, next) {
        return reservationDb.getClashedReseravtionsForDateRange(req.query.startDate, req.query.endDate)
            .then(reservations => {
                const reservedBikes = reservations.length ? reservations.map(item => item.bikeId) : null
                return bikeDb.getByLocationAndFilterExcludingReservedBikes(reservedBikes, req.query.model, req.query.color, req.query.maxWeight, req.query.minWeight, req.query.longitude, req.query.latitude)
            })
            .then(bikes => {
                return res.status(200).json(bikes)
            })
            .catch(err => next(err))
    },

    getWithPaginationExcludingReservedBikes(req, res, next) {
        return reservationDb.getClashedReseravtionsForDateRange(req.query.startDate, req.query.endDate)
            .then(reservations => {
                const reservedBikes = reservations.length ? reservations.map(item => item.bikeId) : null
                return bikeDb.getWithPaginationAndRatingExcludingReservedBikes(reservedBikes, req.query.model, req.query.color, req.query.maxWeight, req.query.minWeight, 10, req.query.skip ? parseInt(req.query.skip) : 0)
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
