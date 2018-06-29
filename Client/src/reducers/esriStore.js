// import store from '../stores/configureStore';

const initialState = {}

export const esriStore = (state = initialState, action) => {
    switch (action.type) {
        case 'MODULES_LOADED': {
            const Graphic = action.payload.Graphic
            const Locator = action.payload.Locator
            const Track = action.payload.Track
            const Search = action.payload.Search
            return { Graphic, Locator, Track, Search }
        }
        case 'SAVE_VIEW':
            return {...state, view:action.payload}
        case 'SAVE_FILTER':
            return {...state, filter:action.payload}
        default:
            return state
    }
}




