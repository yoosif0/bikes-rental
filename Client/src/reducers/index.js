import { combineReducers } from 'redux'
import terState from './ter'
import authStoreState from './authStore';
import selectedUser from './selectedUser';

export default combineReducers({
    terState, authStoreState, selectedUser
})
