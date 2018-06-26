import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
// import { persistStore, persistReducer } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import { saveState } from './services/localStorage';
// import throttle from 'lodash/throttle'


// 

// console.log(store.getState())


// const persistConfig = {
//     key: 'root',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)


// store.subscribe(()=>{
//     console.log('why is that')
// })

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// const persistor = persistStore(store)

// store.subscribe(throttle(()=>{
//     console.log('aaaa')
//     saveState(store.getState().authStoreState)
// }, 1000))



render(
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
            <App />
        {/* </PersistGate> */}
    </Provider>,
    document.getElementById('root')
)
