import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import styles from './style';

const Message = props => {
  const {item, userId} = props;

  const date = dayjs(item.createdDate).format('DD MMMM YYYY,  hh:MM');

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[
          styles.messageContainer,
          item.senderId === userId
            ? styles.senderMessage
            : styles.receiverMessage,
        ]}
        onPress={() => {}}>
        <Text style={styles.message}>{item.text}</Text>
        <Text style={styles.time}>{date}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Message;
