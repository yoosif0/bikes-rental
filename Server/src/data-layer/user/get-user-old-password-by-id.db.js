const usersModel = require('models/users.model')

module.exports = (id) => {
    return usersModel.findById(id).select('password').exec()
}