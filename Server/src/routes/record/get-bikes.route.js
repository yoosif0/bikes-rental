// const getRecords = require('data-layer/record/get-records.db')
const GetDefaultQuery = require('data-layer/get-default-query.db')
const bikeModel = require('models/bike.model')

module.exports = (req, res, next) => {
    // return getRecords(10, req.query.skip ? parseInt(req.query.skip) : 0, req.query.startDate, req.query.endDate).then(x => res.status(200).json(x)).catch(err => next(err))

    const getDefaultQuery = new GetDefaultQuery(10, req.query.skip ? parseInt(req.query.skip) : 0, bikeModel)
    return Promise.all([getDefaultQuery.getItems(), getDefaultQuery.getItemsCount()])
        .then(([bikes, count]) => res.status(200).json({ bikes, count })).catch(err => next(err))


}