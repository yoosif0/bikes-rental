const Joi = require('joi')
const passwordRegex = require('config/regexConstants').passwordRegex
const errorMessageWrapper = require('services/utility').errorMessageWrapper

module.exports = {
    signup(req, res, next) {
        if (req.recaptcha.error) {
            return res.status(400).json(errorMessageWrapper('No captcha'))
        }
    
        const schema = Joi.object().keys({
            name: Joi.string().min(3).max(20).required().label('name'),
            password: Joi.string().regex(passwordRegex).required().label('password'),
            email: Joi.string().email().required().label('email'),
            "g-recaptcha-response": Joi.string()
        })
        return Joi.validate(req.body, schema, (err) => next(err))
    },

    login(req, res, next) {
        let loginErr = new Error('Email or/and password are wrong')
        const schema = Joi.object().keys({
            password: Joi.string().regex(passwordRegex).required().label('password'),
            email: Joi.string().email().required().label('email')
        })
        return Joi.validate(req.body, schema, err => err ? res.status(401).json({ code: 2, msg: loginErr.message }) : next())
    },

    changeMyPassword(req, res, next) {
        const schema = Joi.object().keys({
            oldPassword: Joi.any(),
            newPassword: Joi.string().regex(passwordRegex).required().label('new password'),
        })
        return Joi.validate(req.body, schema, (err) => next(err))
    },

    changeOtherUserPassword(req, res, next) {
        const schema = Joi.object().keys({
            newPassword: Joi.string().regex(passwordRegex).required().label('new password'),
        })
        return Joi.validate(req.body, schema, (err) => next(err))
    },

    updatePasswordByRecoveryCode(req, res, next) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required().label('email'),
            recoveryCode: Joi.string().length(20).required().label('recovery code'),
            newPassword: Joi.string().regex(passwordRegex).required().label('new password')
        })
        return Joi.validate(req.body, schema, (err) => next(err))
    },

    sendMeRecoveryCode(req, res, next){
        const schema = Joi.string().email().required().label('email')
        return Joi.validate(req.body.email, schema, (err) => next(err))
    }

}
