const initialState = {
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    id: window.localStorage.getItem('id'),
    role: window.localStorage.getItem('role'),
    token: window.localStorage.getItem('id_token'),
}

const authStoreState = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                isAuthenticated: true,
                id: action.payload.user._id,
                token: action.payload.token,
                role: action.payload.user.role
            }
        case 'LOGGED_OUT':
            return {
                isAuthenticated: false,
                id: undefined,
                token: undefined,
                role: undefined
            }
        default:
            return state
    }
}



export default authStoreState


