import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './reducers/auth';
import dashboardReducer from './reducers/dashboard';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reducer as network} from 'react-native-offline';
import {createNetworkMiddleware} from 'react-native-offline';
import {sendMessageAsync} from './actionCreators/dashboard/chat';

// We have to map our actions to an object
const actions = {
  sendMessageAsync,
};

// Transform how the persistor reads the network state
const networkTransform = createTransform(
  (inboundState, key) => {
    const actionQueue = [];

    inboundState.actionQueue.forEach(action => {
      if (typeof action === 'function') {
        actionQueue.push({
          function: action.meta.name,
          args: action.meta.args,
        });
      } else if (typeof action === 'object') {
        actionQueue.push(action);
      }
    });

    return {
      ...inboundState,
      actionQueue,
    };
  },
  (outboundState, key) => {
    const actionQueue = [];

    outboundState.actionQueue.forEach(action => {
      if (action.function) {
        const actionFunction = actions[action.function];
        actionQueue.push(actionFunction(...action.args));
      } else {
        actionQueue.push(action);
      }
    });

    return {...outboundState, actionQueue};
  },
  // The 'network' key may change depending on what you
  // named your network reducer.
  {whitelist: ['network']},
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['chat']  => the name of the blacklist is the key of the reducer If you don’t want to persist a part of your state you could put it in the blacklist.
  //whitelist: ['auth'] //The whitelist is set up in the same way as the blacklist except that it defines the parts of state that you do want to persist.
  blacklist: ['auth', 'dashboard'],
  whitelist: ['network'],
  transforms: [networkTransform], // Add the transform into the persist config
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
const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200,
});

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(networkMiddleware, ReduxThunk)),
);

export const persistor = persistStore(store);
