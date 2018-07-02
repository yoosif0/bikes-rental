import { combineReducers } from 'redux'
import authStoreState from './authStore';
import { esriStore } from './esriStore';
import {publicInfoStore} from './publicInfoStore';
import {bikesStore} from './bikesStore';

export default combineReducers({  authStoreState, esriStore, publicInfoStore, bikesStore   })
