const db = require('data-layer/user.db')
const ROLES = require('config/rolesConstants')
const clearUnneededDataFromPayload = require('services/clear-unneeded-data')
const { getToken } = require('core/authentication')
const comparePassword = require('services/compare-password').comparePassword
const errorMessageWrapper = require('services/utility').errorMessageWrapper
const successMessage = require('services/utility').successMessageWrapper
const generateRandomCode = require('services/generate-random-code').generateRandomCode
const mailer = require('services/mailer')

module.exports = {
    signup(req, res, next) {
        const user = req.body
        return db.createUser(user.name, user.email, user.password, ROLES.regular).then(user => {
            return res.status(201).json({ user: clearUnneededDataFromPayload(user), token: getToken(user._id, user.role) })
        }).catch(e => next(e))
    },

    login(req, res, next) {
        let loginErr = new Error('Email or/and password are wrong')
        return db.getUserByEmail(req.body.email).then(user => {
            if (!user) return res.status(401).json({ code: 2, msg: loginErr.message })
            return comparePassword(req.body.password, user.password).then(ok => {
                if (!ok) return res.status(401).json({ code: 2, msg: loginErr.message })
                return res.status(200).json({ user: clearUnneededDataFromPayload(user), token: getToken(user._id, user.role) })
            }).catch(err => next(err))
        })
    },

    async changeMyPassword(req, res, next) {
        const user = await db.getUserOldPasswordById(req.decoded._id)
        if (!user) return next({ nF: 'User' })
        comparePassword(req.body.oldPassword, user.password).then(async ok => {
            if (!ok) return res.status(400).json(errorMessageWrapper('Old Password provided is wrong'))
            user.password = req.body.newPassword
            await user.save().catch(e => next(e))
            return res.json({ success: 'Your password has changed successfully' })
        })
    },

    async changeOtherUserPassword(req, res, next) {
        const user = await db.getUserById(req.params.id).catch(e => next(e))
        if (!user) return next({ nF: 'User' })
        user.password = req.body.newPassword
        user.active = true
        await user.save().catch(e => next(e))
        return res.json(successMessage)
    },

    async sendMeRecoveryCode (req, res, next) {
        const code = generateRandomCode()
        try {
            const user = await db.createRecoveryCode(req.body.email, code)
            if(!user) return res.status(404).json(errorMessageWrapper( 'This email does not exist'))
            await mailer.sendEmailWithCode(req.body.email, code)
            return res.send({ success: 'Please check your email for your recovery code' })
        } catch (e) {
            return next(e)
        }
    },

    async updatepsswordByRecoveryCode(req, res, next) {
        const user = await db.getUserByEmail(req.body.email).catch(err => next(err))
        if (!user) return next({ nF: 'User' })
        if (user.recoveryCode !== req.body.recoveryCode) return res.status(400).json(errorMessageWrapper( 'Wrong recovery code' ))
        else {
            user.password = req.body.newPassword
            user.recoveryCode = null
        }
        await user.save().catch(e => next(e))
        return res.status(200).json({ success: 'Your password has been updated successfully' })
    },

    




}
