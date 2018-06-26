import * as actionTypes from '../constants/ActionTypes';

const initialState = {ters:[76], name: 'Youssef'}

const terState = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TERS:
            return {
                ...state,
                ters: [1, 2, 3]
            }
        default:
            return state
    }
}

export default terState
