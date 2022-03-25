import React from 'react'
import {Platform, TouchableOpacity, Text} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Dashboard from '../screens/Chat/Dashboard'
import MyProfile from '../screens/Chat/MyProfile'
import Colors from '../constants/Colors'
import UsersList from '../screens/Chat/UsersList'
import UserChat from '../screens/Chat/UserChat'


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
const MainStack = createNativeStackNavigator()

export const MainNavigator = () => {

  return (
    <MainStack.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="dashboard">
      <MainStack.Screen
        name="dashboard"
        component={Dashboard}
        options={{title: 'Dashboard'}}
      />

<MainStack.Screen
        name="myProfile"
        component={MyProfile}
        options={{title: 'My Profile'}}
      />
    
       <MainStack.Screen
        name="usersList"
        component={UsersList}
        options={{title: 'Chats'}}
      />
        <MainStack.Screen
        name="userChat"
        component={UserChat}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  )
}
