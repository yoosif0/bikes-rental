const usersModel = require('models/users.model')

module.exports = (_id, mealId) => {
    return usersModel.find({ _id, "meals._id": mealId }, { "meals.$": 1 }).lean().exec().then(data => {
        if (data && data[0] && data[0].meals) {
            return data[0].meals[0]
        } else {
            return null
        }
    })
}


