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
  FlatList,
  Keyboard,
} from 'react-native';
import {
  UserChatHeader,
  Message,
  ImageViewer,
  ShowLoader,
} from '../../components';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import styles from './style';
import messaging from '@react-native-firebase/messaging';
import dayjs from 'dayjs';
import storage from '@react-native-firebase/storage';
import {createNewChat, createNewMessage} from '../../store/actions/dashboard';
import {sendMessageAsync} from '../../store/actionCreators/dashboard/chat';
import uuid from 'react-native-uuid';

const placeholderImg = require('../../../assets/placeholder.jpg');

const UserChat = ({navigation, route}) => {
  const [userChat, setUserChat] = useState([]);
  const [message, setMessage] = useState('');
  const [cameraImage, setCameraImage] = useState([]);
  const [galleryImage, setGalleryImage] = useState([]);
  const [messageImages, setMessageImages] = useState([]);
  const [chatImages, setChatImages] = useState([]);
  const [imageVisible, setImageVisible] = useState(false);
  const [messageImageVisible, setMessageImageVisible] = useState(false);
  const messageRef = useRef();

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.auth.userDetails);
  const allChats = useSelector(state => state.dashboard.allChats);
  const allUsers = useSelector(state => state.dashboard.allUsers);

  const deviceToken = userDetails.deviceToken;
  const chatUserDetails = route.params;

  const chatId = [userDetails.userId, chatUserDetails.userId].sort().join('_');
  const chatRef = database().ref(`chat/${chatId}/messages`);

  const updateMessage = text => {
    setMessage(text);
  };

  const messageHandler = (messageType, images) => {
    const date = new Date();
    const createdDate = date.toString();

    const messageData =
      messageType === 'text'
        ? {
            text: message,
            senderId: userDetails.userId,
            receiverId: chatUserDetails.userId,
            createdDate,
            id: uuid.v4(),
          }
        : {
            images: images,
            senderId: userDetails.userId,
            receiverId: chatUserDetails.userId,
            createdDate,
            id: uuid.v4(),
          };

    dispatch(createNewMessage(messageData, chatId));

    const messageInfo = {
      messageData,
      messageType,
      images,
      chatId,
      deviceToken,
      chatUserDetails,
      userDetails,
    };
    dispatch(sendMessageAsync(messageInfo));
    setMessage('');
    setImageVisible(false);
    setMessageImages([]);
    // sendMessageRequest(messageData, messageType, images);
  };

  const sendMessageRequest = async (messageData, messageType, images) => {
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
    } catch (e) {
      console.log(e.message);
      Alert.alert('', e.message);
    }
  };

  const imageMessageHandler = () => {
    setIsLoading(true);
    let newChatImages = [];
    try {
      chatImages.map(async (image, index) => {
        const imageBucketPath = `/Assets/Images/chat/${image?.fileName}`;
        const reference = storage().ref(imageBucketPath);

        const response = await reference.putFile(image?.uri);
        const url = await storage()
          .ref(`/Assets/Images/chat/${image.fileName}`)
          .getDownloadURL();
        newChatImages.push({uri: url});

        if (messageImages.length === index + 1) {
          messageHandler('images', newChatImages);
        }
      });
    } catch (e) {
      console.log(e);
      Alert.alert('', e.message);
      setIsLoading(false);
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

      setChatImages(cameraMesageImages.concat(response.assets[0]));
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
        setGalleryImage(response.assets[0]);
        setChatImages(response.assets[0]);
        setImageVisible(true);
      }
      console.log(response.assets);
    });
  };

  const getUserChat = snapshot => {
    const chatDetails = [];
    snapshot.forEach(data => {
      chatDetails.push({...data.val(), id: data.key});
    });

    setUserChat(chatDetails.reverse());
  };

  useEffect(() => {
    const allChatIds = allChats.map(item => item.id);
    if (allChatIds.includes(chatId)) {
      const chat = allChats.filter(chat => chat.id === chatId);
      const messages = chat[0]?.messages;

      messages.sort((a, b) => {
        return dayjs(b.createdDate).unix() - dayjs(a.createdDate).unix();
      });

      setUserChat(messages);
    } else {
      let userChatData;
      allUsers.map(user => {
        if (user.userId === chatUserDetails.userId) {
          userChatData = user;
        }
      });
      dispatch(createNewChat(chatId, userChatData));
    }
  }, [allChats]);

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
        messageImages={chatImages}
        footer={ImageViewerFooter}
      />
      <ImageViewer
        visible={messageImageVisible}
        setVisible={setMessageImageVisible}
        messageImages={messageImages}
      />

      {!imageVisible && !messageImageVisible && (
        <FlatList
          style={styles.userChatContainer}
          scrollEnabled
          initialNumToRender={5}
          data={userChat}
          keyExtractor={item => item.id}
          inverted
          renderItem={({item}) => (
            <Message
              item={item}
              userId={userDetails.userId}
              setMessageImageVisible={setMessageImageVisible}
              setMessageImages={setMessageImages}
            />
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
              onPress={messageHandler.bind(this, 'text', chatImages)}
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
