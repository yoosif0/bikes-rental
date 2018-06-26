
const initialState = {
    selectedBike: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SELECTED_BIKE':
            return { selectedBike: action.payload }
        default:
            return state
    }
}




