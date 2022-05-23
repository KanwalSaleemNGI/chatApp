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
import {ReduxNetworkProvider} from 'react-native-offline';

const App = () => {
  return (
    <Provider store={store}>
      <ReduxNetworkProvider>
        <PersistGate persistor={persistor}>
          <PaperProvider
            theme={{
              ...DefaultTheme,
              colors: {...DefaultTheme.colors, primary: Colors.primary},
            }}>
            <AppNavigationContainer />
          </PaperProvider>
        </PersistGate>
      </ReduxNetworkProvider>
    </Provider>
  );
};

export default App;

// import React from 'react';
// import {StyleSheet, Text, TouchableOpacity} from 'react-native';
// function AppButton({onPress}) {
//   return (
//     <TouchableOpacity style={styles.button} onPress={onPress}>
//       <Text style={styles.text}>Register</Text>
//     </TouchableOpacity>
//   );
// }
// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: 'red',
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: '#fff',
//   },
// });
// export default AppButton;
