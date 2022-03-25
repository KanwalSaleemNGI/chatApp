import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import dayjs from 'dayjs';

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

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
  },
  messageContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  senderMessage: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
  },
  receiverMessage: {
    backgroundColor: Colors.inputField,
    alignSelf: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  message: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.black,
    maxWidth: '80%',
  },
  time: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    // color: '#6f7571',
    color: Colors.black,
    textAlignVertical: 'bottom',
    marginHorizontal: 5,
  },
});

export default Message;
