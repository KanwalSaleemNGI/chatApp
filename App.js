/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {AppNavigationContainer} from './src/navigation/stack';
import Colors from './src/constants/Colors';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/ConfigureStore';
import {Alert} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider
          theme={{
            ...DefaultTheme,
            colors: {...DefaultTheme.colors, primary: Colors.primary},
          }}>
          <AppNavigationContainer />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
