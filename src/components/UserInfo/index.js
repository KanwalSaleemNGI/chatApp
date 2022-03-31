import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import styles from './style';

const UserInfo = ({item, resetHandler}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.userContainer}
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate('userChat', item), resetHandler();
      }}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.userImg}} style={styles.profileImage} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.firstName} {item.lastName}
          </Text>
          {/* <Text style={styles.subTitle}>{item.recentChat}</Text> */}
        </View>
      </View>
      {/* <View style={styles.timeContainer}>
<Text style={item.recentChat}>{item.time}</Text>
</View> */}
    </TouchableOpacity>
  );
};

export default UserInfo;
