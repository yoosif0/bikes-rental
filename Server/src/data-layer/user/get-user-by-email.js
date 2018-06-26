const usersModel = require('models/users.model')

module.exports = (email) =>{
    return usersModel.findOne({ email }).select('-__v').exec()
}