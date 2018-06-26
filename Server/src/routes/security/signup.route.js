
const addNewUser = require('data-layer/user/add-new-user.db')
const ROLES = require('config/rolesConstants')
const clearUnneededDataFromPayload = require('services/clear-unneeded-data')
const { getToken } = require('core/authentication')


module.exports = (req, res, next) => {
    const user = req.body
    return addNewUser(user.name, user.email, user.password, ROLES.regular).then(user => {
        return res.status(201).json({ user: clearUnneededDataFromPayload(user), token: getToken(user._id, user.role) })
    }).catch(e => next(e))
}



