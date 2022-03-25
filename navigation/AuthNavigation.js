import React from 'react'
import {Platform, TouchableOpacity, Text} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginForm from '../screens/Authentication/login'
import Colors from '../constants/Colors'
import SignUpForm from '../screens/Authentication/signup'


const defaultNavOptions = (props) => ({
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
    )
  },
  headerShadowVisible: false,
  headerTitleAlign: 'center',
  headerTintColor: 'black',
})
const AuthStack = createNativeStackNavigator()

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="loginForm">
    
      <AuthStack.Screen
        name="loginForm"
        component={LoginForm}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="signUpForm"
        component={SignUpForm}
        options={{title: 'Sign Up'}}
      />
    
    </AuthStack.Navigator>
  )
}
