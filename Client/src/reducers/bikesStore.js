const initialState = {
    isNeedingUpdate: false
}

export const bikesStore = (state = initialState, action) => {
    switch (action.type) {
        case 'BIKES_UPDATED':
            return {
                isNeedingUpdate: false,
            }
        case 'BIKES_RATING_OUT_OF_DATE':
            return {
                isNeedingUpdate: true,
            }
        default:
            return state
    }
}


