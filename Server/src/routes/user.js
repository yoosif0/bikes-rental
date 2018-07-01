const db = require('data-layer/user.db')
const successMessage = require('services/utility').successMessageWrapper
const GetUserQuery = require('data-layer/get-users.db')
const ROLES = require('config/rolesConstants')
const clearUnneededDataFromPayload = require('services/clear-unneeded-data')
const { getToken } = require('core/authentication')

module.exports = {

    getUser(req, res, next) {
        return db.getUserById(req.params.id).then(user => user ? res.status(200).json(user) : next({ nF: 'User' })).catch(err => next(err))
    },

    getUsers(req, res, next) {
        const getUserQuery = new GetUserQuery(10, Number(req.query.skip || 0), req.query.searchFilter)
        return Promise.all([getUserQuery.getUsers(), getUserQuery.getUsersCount()])
            .then(([users, count]) => res.status(200).json({ users, count })).catch(err => next(err))
    },

    removeUser(req, res, next) {
        return db.deleteUser(req.params.id).then(user => user ? res.status(200).json(successMessage) : next({ nF: 'User' })).catch(err => next(err))
    },

    updateUserInfo(req, res, next) {
        return db.updateUserInfo(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }).then((user) => user ? res.status(200).json(user) : next({ nF: 'User' })).catch(err => next(err))
    },

    signup(req, res, next) {
        const user = req.body
        return db.createUser(user.name, user.email, user.password, ROLES.regular).then(user => {
            return res.status(201).json({ user: clearUnneededDataFromPayload(user), token: getToken(user._id, user.role) })
        }).catch(e => next(e))
    }




}
