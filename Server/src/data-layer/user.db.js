const usersModel = require('models/users.model')


module.exports = {
    createUser(name, email, password, role) {
        const newUser = new usersModel({ name, email, password, role })
        newUser.role = role
        return newUser.save()
    },

    deleteUser(id) {
        return usersModel.findByIdAndRemove(id).select('_id')
    },

    getUserByEmail(email) {
        return usersModel.findOne({ email }).select('-__v').exec()
    },

    getUserById(_id) {
        return usersModel.findOne({ _id }).select('-__v').exec()
    },

    getUserOldPasswordById(id) {
        return usersModel.findById(id).select('password').exec()
    },
    
    async getUserRoleById(id) {
        const user = await usersModel.findById(id).select('role').lean().exec().catch(err => { throw err })
        if (!user) return undefined
        return user.role
    },

    updateUserInfo(_id, payload) {
        return usersModel.findOneAndUpdate({ _id }, payload, { new: true }).select('-password -__v')
    },

    createRecoveryCode(email, code) {
        return usersModel.findOneAndUpdate(
            { email },
            { $set: { recoveryCode: code } },
            { new: true }
        )
    }
}