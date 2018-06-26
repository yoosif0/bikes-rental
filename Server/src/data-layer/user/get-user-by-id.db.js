const usersModel = require('models/users.model')

module.exports = (id) => {
    return usersModel.findById(id).select('_id name email role active isTrackingDisplayed maxCalories googleId googleEmail facebookId facebookEmail').exec()
}