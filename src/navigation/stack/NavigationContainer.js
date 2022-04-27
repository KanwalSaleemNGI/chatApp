import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './AuthNavigation';
import {MainNavigator} from './MainNavigation';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {getUser, enableLoader, disableLoader} from '../../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestUserPermission} from '../../store/actionCreators/auth/auth';
import messaging from '@react-native-firebase/messaging';
import {Alert, View, Text, TouchableOpacity} from 'react-native';
import NotificationPopup from 'react-native-push-notification-popup';
import {CustomPopUp} from '../../components';
import {
  getAllUsersAsync,
  getAllChatsAsync,
} from '../../store/actionCreators/dashboard/chat';

const AppNavigationContainer = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.auth.userDetails);
  const isLoading = useSelector(state => state.auth.isLoading);
  const [initializing, setInitializing] = useState(true);
  const popupRef = useRef();

  const onAuthStateChanged = user => {
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (userDetails?.userId) {
      dispatch(getAllUsersAsync(userDetails.userId));
      dispatch(getAllChatsAsync(userDetails.userId));
    }
    dispatch(requestUserPermission());
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      popUpHandler(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const popUpHandler = remoteMessage => {
    popupRef.current.show({
      onPress: () => {
        console.log('Pressed');
      },
      appTitle: 'chatApp',
      // timeText: 'Now',
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      slideOutTime: 5000,
    });
  };
  if (initializing) return null;

  return (
    <NavigationContainer>
      {userDetails ? <MainNavigator /> : <AuthNavigator />}
      <NotificationPopup
        ref={ref => (popupRef.current = ref)}
        renderPopupContent={CustomPopUp}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true}
      />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
