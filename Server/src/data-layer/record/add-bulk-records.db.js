const usersModel = require('models/users.model')

module.exports = (userId, meals) => {
    return usersModel.findOneAndUpdate(
        { _id: userId },
        { meals},
        { new: true })
}