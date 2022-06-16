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

  const name = `${item.userChatData.firstName} ${item.userChatData.lastName}`;

  return (
    <TouchableOpacity
      style={styles.userContainer}
      activeOpacity={0.6}
      testID={TestIds.chatInfo.onPress}
      onPress={() => {
        navigation.navigate('userChat', item.userChatData);
        // console.log('userId:', item.userChatData.userId);
      }}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.userChatData.userImg}}
            style={styles.profileImage}
            testID={TestIds.chatInfo.image}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} testID={TestIds.chatInfo.name}>
            {name}
          </Text>
          {item.recentChat.text ? (
            <Text
              style={styles.subTitle}
              numberOfLines={1}
              testID={TestIds.chatInfo.messageText}>
              {item.recentChat.text}
            </Text>
          ) : (
            <View style={styles.photoContainer}>
              <Icon
                name="image"
                color={Colors.common.darkGrey}
                size={20}
                testID={TestIds.chatInfo.icon}
              />
              <Text style={styles.subTitle} testID={TestIds.chatInfo.photoText}>
                Photo
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time} testID={TestIds.chatInfo.date}>
          {date}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatInfo;
