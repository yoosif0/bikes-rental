const usersModel = require('models/users.model')

module.exports = (_id, role) => {
    return usersModel.update({ _id }, { role })
}
