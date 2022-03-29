
 import React from 'react'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import authReducer from './reducers/auth'
import {composeWithDevTools} from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['chat']  => the name of the blacklist is the key of the reducer If you don’t want to persist a part of your state you could put it in the blacklist.
  //whitelist: ['auth'] //The whitelist is set up in the same way as the blacklist except that it defines the parts of state that you do want to persist.
  blacklist: ['auth'],
  // whitelist: ['auth']
}

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // nested whitelist in the blacklist
  whitelist: ['userDetails']
};



const rootReducer = combineReducers({
  // auth: authReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  // chat: chatReducer
  })


  const persistedReducer = persistReducer(persistConfig, rootReducer)

  
  
  export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk)),
    )

  export  const persistor = persistStore(store)
 
