import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-paper';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';

const chatInfo = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.userContainer}
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate('userChat', item.userChatData);
        //  resetHandler();
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

const styles = StyleSheet.create({
  userContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.inputField,
    borderRadius: 10,
    padding: 10,
  },
  profileContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: '20%',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  titleContainer: {
    width: '80%',
    marginHorizontal: 5,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.black,
  },
  timeContainer: {
    width: '20%',
    alignItems: 'flex-end',
  },
});
export default chatInfo;
