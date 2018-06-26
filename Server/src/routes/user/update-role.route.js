const db = require('data-layer/user/update-role.db')
const successMessage = require('services/utility').successMessageWrapper

module.exports = (req, res, next) => {
    return db(req.params.id, req.body.role).then(ok => ok ? res.status(200).json(successMessage) : next({nF:'User'})).catch(err => next(err))
}

