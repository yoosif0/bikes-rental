
const initialState = {
    selectedBike: null
}

const selectedBike =  (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SELECTED_BIKE':
            return { selectedBike: action.payload }
        default:
            return state
    }
}




export default selectedBike