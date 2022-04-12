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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React, {useEffect, useState} from 'react';
// import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
// import {AppNavigationContainer} from './src/navigation/stack';
// import Colors from './src/constants/Colors';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
// import {store, persistor} from './src/store/ConfigureStore';
// import {
//   Alert,
//   View,
//   TouchableOpacity,
//   Text,
//   SafeAreaView,
//   Button,
//   TextInput,
// } from 'react-native';

// const App = () => {
//   const [input, setInput] = useState('');

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Text testID="title">Hello there</Text>
//         <TextInput
//           placeholder="Name"
//           value={input}
//           onChangeText={setInput}
//           style={{padding: 5}}
//           testID="input"
//         />
//         <Button
//           title="Click Me"
//           onPress={() => Alert.alert(input)}
//           testID="button"
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default App;
