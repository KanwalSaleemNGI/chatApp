/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react'
 import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper'
 import AppNavigationContainer from './navigation/NavigationContainer'
 import Colors from './constants/Colors'
 import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import{ store,persistor} from './store/ConfigureStore'
import {PermissionsAndroid} from 'react-native'


 
 const App = () => {

return(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
   <PaperProvider
     theme={{
       ...DefaultTheme,
       colors: { ...DefaultTheme.colors, primary: Colors.primary },
     }}
   >
     <AppNavigationContainer />
    
   </PaperProvider>
   </PersistGate>
    </Provider>

)
    }
 
 export default App
 