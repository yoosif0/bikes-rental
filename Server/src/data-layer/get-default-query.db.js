// const bikeModel = require('models/bike.model')

module.exports = class DefaultQuery {
    constructor(limit, skip, model, query) {
        this.limit = limit
        this.skip = skip
        this.model = model,
        this.query = query || {}
    }
    getItems() {
        return this.model.find(this.query).limit(this.limit).skip(this.skip).lean().exec()
    }
    getItemsCount() {
        return this.model.find(this.query).count().lean().exec()
    }

}