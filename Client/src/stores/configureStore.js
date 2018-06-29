import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from '../epics';


const epicMiddleware = createEpicMiddleware();
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(epicMiddleware),
)


export default store

epicMiddleware.run(rootEpic);