import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './reducers/auth';
import dashboardReducer from './reducers/dashboard';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reducer as network} from 'react-native-offline';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['chat']  => the name of the blacklist is the key of the reducer If you don’t want to persist a part of your state you could put it in the blacklist.
  //whitelist: ['auth'] //The whitelist is set up in the same way as the blacklist except that it defines the parts of state that you do want to persist.
  blacklist: ['auth', 'dashboard'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['userDetails'],
  blacklist: ['isLoading'],
};

const dashboardPersistConfig = {
  key: 'dashboard',
  storage: AsyncStorage,
  whitelist: ['allChats', 'allUsers'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  dashboard: persistReducer(dashboardPersistConfig, dashboardReducer),
  network,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

export const persistor = persistStore(store);
