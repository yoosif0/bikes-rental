const usersModel = require('models/users.model')

module.exports = (name, email, password, role) => {
    const newUser = new usersModel({name, email, password, role})
    newUser.role = role
    return newUser.save()
}