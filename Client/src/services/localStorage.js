export const loadState = () => {

    try {
        const profile = JSON.parse(window.localStorage.getItem(`profile`))
        return { profile }
    } catch (e) {
        return undefined
    }

}

export const persistMyInfo = (role, _id, token) => {
    window.localStorage.setItem(`role`, role)
    window.localStorage.setItem(`id`, _id)
    window.localStorage.setItem('id_token', token)
}



export const unPersistMyInfo = () => {
    window.localStorage.removeItem('id_token')
    // window.localStorage.removeItem('profile')
    window.localStorage.removeItem('role')
    window.localStorage.removeItem('id')
}

// export const saveProfile = (profile) => {
//     window.localStorage.setItem(`role`, profile.role)
//     window.localStorage.setItem(`id`, profile._id)
//     window.localStorage.setItem(`profile`, JSON.stringify(profile))
// }