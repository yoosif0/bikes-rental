module.exports = user => {
    user.password = undefined
    user.recoveryCode = undefined
    user.activationCode = undefined
    user.active = undefined
    return user
}