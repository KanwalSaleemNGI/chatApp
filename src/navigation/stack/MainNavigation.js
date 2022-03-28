import React from 'react';
import {Platform, TouchableOpacity, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dashboard, MyProfile, UserChat, UsersList} from '../../screens';
import Colors from '../../constants/Colors';

const screens = [
  {
    key: 1,
    name: 'dashboard',
    component: Dashboard,
    options: {title: 'Dashboard'},
  },
  {
    key: 2,
    name: 'myProfile',
    component: MyProfile,
    options: {title: 'My Profile'},
  },
  {
    key: 3,
    name: 'usersList',
    component: UsersList,
    options: {title: 'Chats'},
  },
  {
    key: 4,
    name: 'userChat',
    component: UserChat,
    options: {headerShown: false},
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
const MainStack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="dashboard">
      {screens.map(screen => {
        return <MainStack.Screen {...screen} />;
      })}
    </MainStack.Navigator>
  );
};
