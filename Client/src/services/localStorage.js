export const loadState = () => {

    try {
        const profile = JSON.parse(window.localStorage.getItem(`profile`))
        return { profile }
    } catch (e) {
        return undefined
    }

}

export const saveState = (state) => {
    window.localStorage.setItem(`role`, state.user.role)
    window.localStorage.setItem(`id`, state.user._id)
    // window.localStorage.setItem(`profile`, JSON.stringify(state.user))
    window.localStorage.setItem('id_token', state.token)
}



export const removeState = () => {
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