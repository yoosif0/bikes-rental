const usersModel = require('models/users.model')

module.exports = (userId, mealId) => {
    return usersModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { meals: { _id: mealId } } },
        { new: true }).select('_id')
}