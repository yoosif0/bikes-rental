const ROLES = require('config/rolesConstants')
const errorMessageWrapper = require('services/utility').errorMessageWrapper


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

function showOnlyAvailableBikesForRegularUsers(req, res, next){
    if(req.decoded.role==='regular'){
        req.query.isAvailable= true
    }
    next()
}


module.exports = { allowSelfAndManager, preventRegularUsers, showOnlyAvailableBikesForRegularUsers }

