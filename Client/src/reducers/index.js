import { combineReducers } from 'redux'
import authStoreState from './authStore';
import { esriStore } from './esriStore';
import {publicInfoStore} from './publicInfoStore';

export default combineReducers({  authStoreState, esriStore, publicInfoStore   })
