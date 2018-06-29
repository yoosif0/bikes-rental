
const initialState = {
    email: null
}

const publicInfoStore =  (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_PUBLIC_EMAIL':
            return { email: action.payload }
        default:
            return state
    }
}




export default publicInfoStore