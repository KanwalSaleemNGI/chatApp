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
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthButton} from '../../components';
import Colors from '../../constants/Colors';
import {logOutHandler} from '../../store/actionCreators/auth';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import styles from './style';

const selectionOptions = [
  {
    name: 'My Profile',
    icon: 'person',
    route: 'myProfile',
  },

  {
    name: 'My Chats',
    icon: 'chat',
    route: 'usersList',
  },
];

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const [selected, setSelectedItem] = useState('');
  const userDetails = useSelector(state => state.auth.userDetails);

  useFocusEffect(
    useCallback(() => {
      setSelectedItem('');
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={() => dispatch(logOutHandler(userDetails))}>
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
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.infoContainer}>
        {selectionOptions.map(option => (
          <TouchableOpacity
            key={option.route}
            style={styles.optionsContainer}
            onPress={() => {
              setSelectedItem(option.name);
              navigation.navigate(option.route);
            }}
            activeOpacity={0.8}>
            <Icon name={option.icon} color={Colors.black} size={30} />
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
    </ScrollView>
  );
};

export default Dashboard;
