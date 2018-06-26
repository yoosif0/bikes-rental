
const getUserPasswordFromDb = require('data-layer/user/get-user-old-password-by-id.db')
const comparePassword = require('services/compare-password').comparePassword
const errorMessageWrapper = require('services/utility').errorMessageWrapper

module.exports = async (req, res, next) => {
    const user = await getUserPasswordFromDb(req.decoded._id)
    if (!user) return next({ nF: 'User' })
    comparePassword(req.body.oldPassword, user.password).then(async ok => {
        if (!ok) return res.status(400).json(errorMessageWrapper( 'Old Password provided is wrong' ))
        user.password = req.body.newPassword
        await user.save().catch(e => next(e))
        return res.json({ success: 'Your password has changed successfully' })
    })

}






