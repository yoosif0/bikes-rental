const usersModel = require('models/users.model')

module.exports =
    class getUserQuery {
        constructor(limit, skip, roleFilter, searchFilter) {
            this.limit = limit
            this.skip = skip
            this.query = {}
            if (searchFilter) this.query.name = { $regex: RegExp(`.*${searchFilter}.*`) }
            if (roleFilter) this.query.role = roleFilter
        }
        getUsers() {
            return usersModel.find(this.query).limit(this.limit).skip(this.skip)
            .select('_id name email role active isTrackingDisplayed maxCalories googleId googleEmail facebookId facebookEmail').lean().exec()
        }
        getUsersCount() {
            return usersModel.find(this.query).select('-meals').count().lean().exec()
        }

    }