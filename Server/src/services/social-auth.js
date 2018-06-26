const getUserByAttribute = require('data-layer/user/get-user-by-attribute.db')
const clearUnneededDataFromPayload = require('./clear-unneeded-data')
const addNewUser = require('data-layer/user/add-new-user.db')
const ROLES = require('config/rolesConstants')
const { getToken } = require('core/authentication')

module.exports = class SocialAuth {
    constructor(id, name, email, provider) {
        this.id = id;
        this.name = name
        if(provider==='facebook') {
            this.idKey = 'facebookId'
            this.emailKey = 'facebookEmail'
        } else {
            this.idKey = 'googleId'
            this.emailKey = 'googleEmail'
        }
        this.email = email
    }

    action() {
        return new Promise((resolve, reject) => {
            return getUserByAttribute({[this.idKey]: this.id}).then(existingUser => {
                if (existingUser) {
                    resolve(this._getPayload(existingUser))
                } else {
                    // return getUserByAttribute({email: this.email}).then(existingUserWithEmail =>{
                    //     if(existingUserWithEmail) {
                    //         return resolve(this._getPayload(existingUserWithEmail))
                    //     } else {
                            return this._addUser().then(user => resolve(this._getPayload(user)).catch(err => reject(err)))
                        // }
                    // })
                        
                }
            }).catch(err => reject(err))
        })
    }

    _addUser() {
        const user = {
            name: this.name,
            meals: [],
            active: true,
            maxCalories: 2250,
            isTrackingDisplayed: true,
        }
        user[this.emailKey]=this.email
        user[this.idKey] = this.id
        return addNewUser(user, ROLES.regular)
    }
    
    _getPayload(user) {
        return { user: clearUnneededDataFromPayload(user), token: getToken(user._id, user.role) }
    }
}