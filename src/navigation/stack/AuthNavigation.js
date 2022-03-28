import React from 'react';
import {Platform, TouchableOpacity, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginForm, SignUpForm} from '../../screens';
import Colors from '../../constants/Colors';

const screens = [
  {
    key: 1,
    name: 'loginForm',
    component: LoginForm,
    options: {headerShown: false},
  },
  {
    key: 2,
    name: 'signUpForm',
    component: SignUpForm,
    options: {title: 'Sign Up'},
  },
];

const defaultNavOptions = props => ({
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? '#E5E5E5' : '#E5E5E5',
  },

  headerLeft: () => {
    return (
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Inter-SemiBold',
            color: Colors.primary,
          }}
          allowFontScaling={false}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },
  headerShadowVisible: false,
  headerTitleAlign: 'center',
  headerTintColor: 'black',
});
const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="loginForm">
      {screens.map(screen => {
        return <AuthStack.Screen {...screen} />;
      })}
    </AuthStack.Navigator>
  );
};
