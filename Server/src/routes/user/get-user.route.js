const db = require('data-layer/user/get-user-by-id.db')

module.exports = (req, res, next) => {
    return db(req.params.id).then(user => user ? res.status(200).json(user) : next({nF:'User'}))
        .catch(err => next(err))
}

