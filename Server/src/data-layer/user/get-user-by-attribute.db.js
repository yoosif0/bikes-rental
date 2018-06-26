const usersModel = require('models/users.model')

module.exports = (attr) =>{
    return usersModel.findOne(attr).select('-meals -__v -password').exec()
}