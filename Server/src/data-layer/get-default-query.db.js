// const bikeModel = require('models/bike.model')

module.exports = class DefaultQuery {
    constructor(limit, skip, model) {
        this.limit = limit
        this.skip = skip
        this.model = model
    }
    getItems() {
        return this.model.find({}).limit(this.limit).skip(this.skip).lean().exec()
    }
    getItemsCount() {
        return this.model.find({}).count().lean().exec()
    }

}