const usersModel = require('models/users.model')

module.exports = async (id) => {
    const user = await usersModel.findById(id).select('role').lean().exec().catch(err=>{throw err})
    if (!user) return undefined
    return  user.role
}