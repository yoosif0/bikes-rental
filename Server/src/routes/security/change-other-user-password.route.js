
const getUserById = require('data-layer/user/get-user-by-id.db')
const successMessage = require('services/utility').successMessageWrapper


module.exports = async (req, res, next) => {
    const user = await getUserById(req.params.id).catch(e => next(e))
    if(!user) return next({nF: 'User'})
    user.password = req.body.newPassword
    user.active = true
    await user.save().catch(e => next(e))
    return res.json(successMessage)
}






