import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import dayjs from 'dayjs';
import styles from './style';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';

const Message = props => {
  const {item, userId, setMessageImageVisible, setMessageImages} = props;
  const navigation = useNavigation();

  const date = dayjs(item.createdDate).format('DD/MM/YYYY,  hh:mm');

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
        {item.text ? (
          <Text style={styles.message}>{item.text}</Text>
        ) : (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              setMessageImageVisible(true), setMessageImages(item.images);
            }}>
            <ImageBackground
              source={{uri: item.images[0].uri}}
              resizeMode="cover"
              style={styles.image}>
              {item.images.length > 1 && (
                <Text style={styles.imageTitle}>
                  + {item.images.length - 1}
                </Text>
              )}
            </ImageBackground>
          </TouchableOpacity>
        )}

        <Text style={styles.time}>{date}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Message);
