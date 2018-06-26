const db = require('data-layer/user/update-user-info.db')


module.exports = (req, res, next) => {
    return db(req.params.id, {
        name: req.body.name,
        maxCalories: req.body.maxCalories,
        isTrackingDisplayed: req.body.isTrackingDisplayed
    }).then((user) => user ? res.status(200).json(user) : next({ nF: 'User' })).catch(err => next(err))
}
