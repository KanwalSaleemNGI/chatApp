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
import UserChatHeader from '../../components/Chat/UserChatHeader';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Message from '../../components/Chat/Message';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

const placeholderImg = require('../../assets/placeholder.jpg');

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
        // console.log('The ' + data.key + ' score is ' + data.val());

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

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.backgroundColor,
    flexGrow: 1,
    alignItems: 'center',
    flex: 1,
  },
  searchUserContainer: {
    marginVertical: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  searchUser: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.black,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: Colors.inputField,
    borderRadius: 25,
    width: '80%',
    height: 50,
  },
  sendContainer: {
    width: '20%',
    paddingRight: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginHorizontal: 3,
    justifyContent: 'center',
  },
  userChatContainer: {
    // height: '80%',
    // marginVertical: 30,
    width: '100%',
    paddingHorizontal: 10,
  },

  noTitle: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: Colors.black,
  },
});

export default UserChat;

// //import React, { Component } from 'react';
// import {View, Text} from 'react-native'

// class User extends Component {
//   shouldComponentUpdate(nextProps) {
//     console.log('User will update!',nextProps);
//   }

//   render() {
//     return <View>{this.props.name}</View>;
//   }
// }

// // const User = (props) => {
// //   return <li className={classes.user}>{props.name}</li>;
// // };

// export default User;
