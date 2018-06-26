import { combineReducers } from 'redux'
import terState from './ter'
import authStoreState from './authStore';

export default combineReducers({
    terState, authStoreState
})
