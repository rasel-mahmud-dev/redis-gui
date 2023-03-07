import {createStore, applyMiddleware, compose} from 'redux'
import Thunk from 'redux-thunk'
import rootReducer from './reducer/combineReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['auth']
  }

const init ={}
const middleware = [Thunk]
// const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(rootReducer,init,composeWithDevTools(applyMiddleware(...middleware)))
// let persistor = persistStore(store)
 export default store
//  export {persistor}

//  ,
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())