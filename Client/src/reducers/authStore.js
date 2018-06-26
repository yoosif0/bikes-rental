// import * as actionTypes from '../constants/ActionTypes';

const initialState = {
    
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    id: window.localStorage.getItem('id'),
    role: window.localStorage.getItem('role'),
    token: window.localStorage.getItem('id_token'),
    profile: JSON.parse(window.localStorage.getItem('profile')),
    
    

}

const authStoreState = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                isAuthenticated: true,
                id: action.payload._id,
                profile: action.payload.user,
                token: action.payload.token,
                role: action.payload.user.role
            }
        case 'LOGGED_OUT':
            return {
                isAuthenticated: false,
                id: undefined,
                profile: undefined,
                token: undefined,
                role: undefined
            }
        default:
            return state
    }
}



export default authStoreState


