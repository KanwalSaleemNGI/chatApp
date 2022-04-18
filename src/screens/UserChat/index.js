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
import {UserChatHeader, Message, ImageViewer} from '../../components';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import styles from './style';
import messaging from '@react-native-firebase/messaging';
import dayjs from 'dayjs';
import storage from '@react-native-firebase/storage';

const placeholderImg = require('../../../assets/placeholder.jpg');

const UserChat = ({navigation, route}) => {
  const [userChat, setUserChat] = useState([]);
  const [message, setMessage] = useState('');
  const [cameraImage, setCameraImage] = useState([]);
  const [galleryImage, setGalleryImage] = useState([]);
  const [messageImages, setMessageImages] = useState([]);
  const [imageVisible, setImageVisible] = useState(false);

  const userDetails = useSelector(state => state.auth.userDetails);

  const deviceToken = userDetails.deviceToken;

  const chatUserDetails = route.params;

  const messageRef = useRef();

  const chatId = [userDetails.userId, chatUserDetails.userId].sort().join('_');

  const updateMessage = text => {
    setMessage(text);
  };

  const messageHandler = async (messageType, images) => {
    const date = new Date();
    const createdDate = date.toString();

    const messageData =
      messageType === 'text'
        ? {
            text: message,
            senderId: userDetails.userId,
            receiverId: chatUserDetails.userId,
            createdDate,
          }
        : {
            images: images,
            senderId: userDetails.userId,
            receiverId: chatUserDetails.userId,
            createdDate,
          };

    try {
      await database().ref(`/chat/${chatId}/messages`).push().set(messageData);

      await database()
        .ref(`/chat/${chatId}`)
        .update({
          recentChat: {
            ...messageData,
            senderDeviceToken: deviceToken,
            receiverDeviceToken: chatUserDetails.deviceToken,
          },
        });

      const resposne = await fetch(
        'https://fcm.googleapis.com/v1/projects/chatapp-10719/messages:send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ya29.A0ARrdaM-33jUWm3fwo2PAzU0r5cKo6XtS29knumAF_SGl4Zcae6s7fKzGsQWjHrxdQ0EtNcdZkoy0-AH8lp_kiOgXdLPvWdUclcyGz5Z0ehl4-mxVKqhwttFJiBCocmZSJb88IecAFVq00EhdDnOAf1xmuExE',
          },
          body: JSON.stringify({
            message: {
              token: userDetails.deviceToken,
              data: {},
              notification: {
                body: message,

                title: `${chatUserDetails.firstName}${chatUserDetails.lastName}`,
              },
            },
          }),
        },
      );
      const responseData = await resposne.json();

      setMessage('');
      setImageVisible(false);
      setMessageImages([]);
      messageRef.current.blur();
    } catch (e) {
      console.log(e.message);
      Alert.alert('', e.message);
    }
  };

  const imageMessageHandler = () => {
    let chatImages = [];
    try {
      messageImages.map(async (image, index) => {
        const imageBucketPath = `/Assets/Images/chat/${image?.fileName}`;
        const reference = storage().ref(imageBucketPath);

        const response = await reference.putFile(image?.uri);
        const url = await storage()
          .ref(`/Assets/Images/chat/${image.fileName}`)
          .getDownloadURL();
        chatImages.push({uri: url});

        if (messageImages.length === index + 1) {
          messageHandler('images', chatImages);
        }
      });
    } catch (e) {
      console.log(e);
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
      const cameraMesageImages = cameraImage;
      response.assets &&
        setCameraImage(prev => prev.concat(response.assets[0]));

      setMessageImages(cameraMesageImages.concat(response.assets[0]));
      setImageVisible(true);
    });
  };

  const galleryHandler = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
      // selectionLimit: 5,
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return Alert.alert('Cancelled', 'Module was cancelled', [
          {text: 'Cancel', style: 'cancel'},
        ]);
      }

      if (response.assets.length > 5) {
        Alert.alert('', 'You can not select more than 1 image');
        return;
      } else {
        setGalleryImage(response.assets);
        setMessageImages(response.assets);
        setImageVisible(true);
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

  const ImageViewerFooter = () => {
    return (
      <TouchableOpacity
        onPress={imageMessageHandler}
        style={styles.sendContainer}
        activeOpacity={0.6}
        testID="sendMessageButton">
        <Icon name="send" color={Colors.primary} size={30} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen} testID="userChatView">
      <UserChatHeader chatUserDetails={chatUserDetails} />
      <ImageViewer
        visible={imageVisible}
        setVisible={setImageVisible}
        messageImages={messageImages}
        footer={ImageViewerFooter}
      />
      {!imageVisible && (
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
      )}

      <View style={styles.searchUserContainer}>
        <TextInput
          testID="messageInput"
          placeholder="Message"
          placeholderTextColor={Colors.black}
          multiline={true}
          style={styles.searchUser}
          value={message}
          onChangeText={updateMessage}
          ref={e => {
            messageRef.current = e;
          }}
          onBlur={() => Keyboard.dismiss()}
        />
        <View style={styles.sendContainer}>
          {message ? (
            <TouchableOpacity
              onPress={messageHandler.bind(this, 'text')}
              activeOpacity={0.6}
              testID="sendMessageButton">
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
