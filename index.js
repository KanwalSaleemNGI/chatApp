/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

GoogleSignin.configure({
  // webClientId: '774911670434-fsa8b5q44f4llprcl3nrvkeq1ejk4ke4.apps.googleusercontent.com'
  // offlineAccess: true,
  webClientId:
    '774911670434-jjt809eqf8vl7b424e9ue5t1cks2l111.apps.googleusercontent.com',
});
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
