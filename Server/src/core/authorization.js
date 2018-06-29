const ROLES = require('config/rolesConstants')
const errorMessageWrapper = require('services/utility').errorMessageWrapper
const db = require('data-layer/user.db')


function preventRegularUsers(req, res, next) {
    const role = req.decoded.role
    if (role === ROLES.regular) return res.status(403).json(errorMessageWrapper('Not Authorized.'))
    return next()
}

function allowSelfAndManager(req, res, next) {
    const role = req.decoded.role
    if (req.decoded._id === req.params.id || role === ROLES.manager) {
        return next()
    } else {
        return res.status(403).json(errorMessageWrapper('Not Authorized.'))
    }
}


module.exports = { allowSelfAndManager, preventRegularUsers, }

