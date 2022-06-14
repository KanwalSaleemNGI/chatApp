import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import TestIds from '../../constants/TestIds';

const ChatInfo = ({item}) => {
  const navigation = useNavigation();
  const date = dayjs(item.recentChat.createdDate).format('DD/MM/YYYY');

  return (
    <TouchableOpacity
      style={styles.userContainer}
      activeOpacity={0.6}
      testID={TestIds.chatInfo.onPress}
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
          {item.recentChat.text ? (
            <Text style={styles.subTitle} numberOfLines={1}>
              {item.recentChat.text}
            </Text>
          ) : (
            <View style={styles.photoContainer}>
              <Icon name="image" color={Colors.common.darkGrey} size={20} />
              <Text style={styles.subTitle}>Photo</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatInfo;
