import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
} from 'react-native';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import styles from './style';

const UserInfo = ({item, resetHandler}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      testID={item.userId}
      style={styles.userContainer}
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate('userChat', item),
          resetHandler(),
          console.log('userId:', item.userId);
      }}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.userImg}} style={styles.profileImage} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.firstName} {item.lastName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserInfo;
