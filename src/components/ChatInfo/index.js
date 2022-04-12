import React, {useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Keyboard} from 'react-native';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import styles from './style';

const chatInfo = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.userContainer}
      activeOpacity={0.6}
      testID={item.userChatData.userId}
      onPress={() => {
        navigation.navigate('userChat', item.userChatData);
        console.log('userId:', item.userChatData.userId);
      }}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.userChatData.userImg}}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.userChatData.firstName} {item.userChatData.lastName}
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

export default chatInfo;
