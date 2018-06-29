import { combineReducers } from 'redux'
import terState from './ter'
import authStoreState from './authStore';
import selectedUser from './selectedUser';
import { esriStore } from './esriStore';

export default combineReducers({
    terState, authStoreState, selectedUser, esriStore   
})
