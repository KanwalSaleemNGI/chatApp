import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './AuthNavigation';
import {MainNavigator} from './MainNavigation';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {getUser, enableLoader, disableLoader} from '../../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigationContainer = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.auth.userDetails);
  const isLoading = useSelector(state => state.auth.isLoading);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('userDetails');
    if (userData !== null) {
      const parseUser = JSON.parse(userData);
      dispatch(getUser(parseUser));
    }
  };

  useEffect(() => {
    // getUserDetails()
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {userDetails ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
