import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  PermissionsAndroid,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {UserChatHeader, Message} from '../../components';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import styles from './style';

const placeholderImg = require('../../../assets/placeholder.jpg');

const UserChat = ({navigation, route}) => {
  const [userChat, setUserChat] = useState([]);
  const [message, setMessage] = useState('');
  const [cameraImage, setCameraImage] = useState([]);
  const [galleryImage, setGalleryImage] = useState([]);
  const userDetails = useSelector(state => state.auth.userDetails);
  const chatUserDetails = route.params;
  const messageRef = useRef();

  const chatId = [userDetails.userId, chatUserDetails.userId].sort().join('_');

  const updateMessage = text => {
    setMessage(text);
  };

  const messageHandler = async () => {
    const date = new Date();
    const createdDate = date.toString();

    const messageData = {
      text: message,
      senderId: userDetails.userId,
      receiverId: chatUserDetails.userId,
      createdDate,
    };

    try {
      await database().ref(`/chat/${chatId}/messages`).push().set(messageData);

      await database().ref(`/chat/${chatId}`).update({recentChat: messageData});
      setMessage('');
      messageRef.current.blur();
    } catch (e) {
      console.log(e.message);
      Alert.alert('', e.message);
    }
  };

  const cameraHandler = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        return Alert.alert('Cancelled', 'Module was cancelled', [
          {text: 'Cancel', style: 'cancel'},
        ]);
      }
      console.log(response.assets);
      response.assets &&
        setCameraImage(prev => prev.concat(response.assets[0]));
    });
  };

  const galleryHandler = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
      selectionLimit: 2,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return Alert.alert('Cancelled', 'Module was cancelled', [
          {text: 'Cancel', style: 'cancel'},
        ]);
      }

      if (response.assets.length > 5) {
        Alert.alert('', 'You can not select more than 5 images');
        return;
      } else {
        setGalleryImage(response.assets);
      }
      console.log(response.assets);
    });
  };

  const getUserChat = useCallback(() => {
    const chatRef = database().ref(`chat/${chatId}/messages`);
    chatRef.orderByValue().on('value', snapshot => {
      const chatDetails = [];
      snapshot.forEach(data => {
        chatDetails.push({...data.val(), id: data.key});
      });
      setUserChat(chatDetails.reverse());
    });
  }, []);

  useEffect(() => {
    getUserChat();
    const chatRef = database().ref(`chat/${chatId}/messages`);
    return () => chatRef.off();
  }, [getUserChat]);

  return (
    <View style={styles.screen}>
      <UserChatHeader chatUserDetails={chatUserDetails} />

      <FlatList
        style={styles.userChatContainer}
        scrollEnabled
        initialNumToRender={5}
        data={userChat}
        keyExtractor={item => item.id}
        inverted
        renderItem={({item}) => (
          <Message item={item} userId={userDetails.userId} />
        )}
      />

      <View style={styles.searchUserContainer}>
        <TextInput
          placeholder="Message"
          placeholderTextColor={Colors.black}
          multiline={true}
          style={styles.searchUser}
          value={message}
          onChangeText={updateMessage}
          ref={e => {
            messageRef.current = e;
          }}
          onSubmitEditing={() => {
            messageRef.current.blur();
          }}
          secureTextEntry={true}
          blurOnSubmit={false}
          returnKeyType="next"
        />
        <View style={styles.sendContainer}>
          {message != '' ? (
            <TouchableOpacity onPress={messageHandler} activeOpacity={0.6}>
              <Icon name="send" color={Colors.primary} size={30} />
            </TouchableOpacity>
          ) : (
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                onPress={cameraHandler}
                activeOpacity={0.6}
                style={styles.imageContainer}>
                <Icon name="add-a-photo" color={Colors.primary} size={22} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={galleryHandler}
                activeOpacity={0.6}
                style={styles.imageContainer}>
                <Icon name="image" color={Colors.primary} size={22} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserChat;
