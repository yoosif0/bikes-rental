
const mailer = require('services/mailer')
const getUserByEmailFromDb = require('data-layer/user/get-user-by-email')
const errorMessageWrapper = require('services/utility').errorMessageWrapper
const successMessage = require('services/utility').successMessageWrapper

module.exports = (req, res, next) => {
    getUserByEmailFromDb(req.body.email).then(async (user) => {
        if (user) {
            return res.status(400).json(errorMessageWrapper( 'This user is already registered in our system' ))
        } else {
            try {
                await mailer.sendInvitation(req.body.email, req.body.url)
                return res.status(200).json(successMessage)
            } catch (e) {
                return next(e)
            }
        }
    }).catch(err => next(err))


}

