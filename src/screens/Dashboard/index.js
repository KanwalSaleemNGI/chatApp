import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthButton} from '../../components';
import Colors from '../../constants/Colors';
import {logOutHandler} from '../../store/actionCreators/auth/auth';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import styles from './style';

const selectionOptions = [
  {
    name: 'My Profile',
    icon: 'person',
    route: 'myProfile',
    testID: 'myProfileButton',
  },

  {
    name: 'My Chats',
    icon: 'chat',
    route: 'usersList',
    testID: 'myChatsButton',
  },
];

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const [selected, setSelectedItem] = useState('');
  const userDetails = useSelector(state => state.auth.userDetails);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity
            testID="logoutButton"
            onPress={() => dispatch(logOutHandler(userDetails))}
            // onPress={() => Alert.alert('logout')}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-SemiBold',
                color: Colors.primary,
              }}
              allowFontScaling={false}>
              Log out
            </Text>
          </TouchableOpacity>
        );
      },
    });
  }, []);

  return (
    <View style={styles.screen} testID="dashboardView">
      <View style={styles.infoContainer}>
        {selectionOptions.map(option => (
          <TouchableOpacity
            key={option.route}
            testID={option.testID}
            style={styles.optionsContainer}
            onPress={() => {
              setSelectedItem(option.name);
              navigation.navigate(option.route);
            }}
            activeOpacity={0.8}>
            <Icon
              name={option.icon}
              color={selected === option.name ? Colors.primary : Colors.black}
              size={30}
            />
            <Text
              style={[
                styles.title,
                {
                  color:
                    selected === option.name ? Colors.primary : Colors.black,
                },
              ]}
              allowFontScaling={false}>
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Dashboard;
