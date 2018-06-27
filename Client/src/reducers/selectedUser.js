
const initialState = {
    selectedUser: null
}


 const selectedUser =  (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SELECTED_BIKE':
            return { selectedUser: action.payload }
        default:
            return state
    }
}


export default selectedUser