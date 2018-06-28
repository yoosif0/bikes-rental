const ROLES = require('config/rolesConstants')
const errorMessageWrapper = require('services/utility').errorMessageWrapper
const db = require('data-layer/user.db')


function preventRegularUsers(req, res, next) {
    const role = req.decoded.role
    if (role === ROLES.regular) return res.status(403).json(errorMessageWrapper('Not Authorized.'))
    return next()
}

function allowOnlyRegularUsersToAccessed(req, res, next) {
    return db.getUserRoleById(req.params.id)
        .then(toBeAccessedRole => {
            if (!toBeAccessedRole) return next({ nF: 'User' })
            if (toBeAccessedRole === ROLES.regular) {
                return next()
            } else {
                return res.status(403).json(errorMessageWrapper('Not Authorized to manipulate non regular users.'))
            }
        })
        .catch(e => next(e))
}


function allowSelfAndManager(req, res, next) {
    const role = req.decoded.role
    if (req.decoded._id === req.params.id || role === ROLES.admin) {
        return next()
    }
    switch (role) {
        case ROLES.regular: return  res.status(403).json(errorMessageWrapper('Not Authorized.'))
        case ROLES.manager: return allowOnlyRegularUsersToAccessed(req, res, next)
    }
}


module.exports = { allowSelfAndManager, preventRegularUsers, }

