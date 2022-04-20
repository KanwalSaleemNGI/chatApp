import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Colors from '../../constants/Colors';
import {UserInfo, ChatInfo, ShowLoader} from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {get} from 'react-hook-form';
import dayjs from 'dayjs';
import styles from './style';
import {useNavigation} from '@react-navigation/native';

const placeholderImg = require('../../../assets/placeholder.jpg');

const UsersList = () => {
  const navigation = useNavigation();
  const [chatList, setChatList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const chatRef = database().ref(`chat`);
  const userDetails = useSelector(state => state.auth.userDetails);

  useEffect(() => {
    getAllusers();

    chatRef.orderByValue().on('value', fetchChats);
    return () => {
      setSearch('');
      chatRef.off();
    };
  }, []);

  const searchHandler = value => {
    setSearch(value);
    if (value) {
      setSearchUsers(prev =>
        prev.filter(item =>
          `${item.firstName} ${item.lastName}`
            .toLowerCase()
            .includes(value.toLowerCase()),
        ),
      );
    } else {
      setSearchUsers(allUsers);
    }
  };

  const resetHandler = () => {
    setSearch('');
  };

  const fetchChats = snapshot => {
    const chatListData = [];

    if (snapshot.val()) {
      const totalChatCount = Object.keys(snapshot.val()).length;

      snapshot.forEach(async (data, index) => {
        const chatData = data.val();
        if (
          userDetails.userId === chatData?.recentChat?.senderId ||
          userDetails.userId === chatData?.recentChat?.receiverId
        ) {
          const chatUserId2 =
            userDetails.userId === chatData.recentChat.senderId
              ? chatData.recentChat.receiverId
              : chatData.recentChat.senderId;

          chatListData.push({
            ...chatData,
            id: data.key,
            chatUserId2,
          });
        }

        if (totalChatCount === index + 1) {
          let chatData = [];
          chatListData.map(async (item, index) => {
            const response = await database()
              .ref(`/users/${item.chatUserId2}`)
              .once('value');
            const userChatData = response.val();

            chatData.push({...item, userChatData: userChatData});

            if (chatListData.length === index + 1) {
              chatData.sort((a, b) => {
                return (
                  dayjs(b.recentChat.createdDate).unix() -
                  dayjs(a.recentChat.createdDate).unix()
                );
              });
              console.log('ne');
              setChatList(chatData);
              setIsLoading(false);
            }
          });
        }
      });
    } else {
      setIsLoading(false);
    }
  };

  const getAllusers = async () => {
    const response = await database().ref(`/users`).once('value');
    const responseData = response.val();
    const allUsersData = [];

    for (const key in responseData) {
      allUsersData.push(responseData[key]);
    }
    const filteredUsers = allUsersData.filter(
      item => item.userId !== userDetails.userId,
    );

    setAllUsers(filteredUsers);
    setSearchUsers(filteredUsers);
  };

  return isLoading ? (
    <ShowLoader />
  ) : (
    <View style={styles.screen} testID="usersListView">
      <View style={styles.searchUserContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.black}
          multiline={true}
          style={styles.searchUser}
          value={search}
          onChangeText={searchHandler}
          ref={searchRef}
          testID="searchInput"
          onBlur={() => {
            Keyboard.dismiss();
          }}
        />
        <TouchableOpacity
          onPress={() => searchRef.current.focus()}
          activeOpacity={0.6}>
          <Icon name="search" color={Colors.black} size={22} />
        </TouchableOpacity>
      </View>

      <View style={styles.usersListContainer}>
        <FlatList
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.usersList}
          initialNumToRender={5}
          data={!search ? chatList : searchUsers}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.noTitle}>
                {!search ? 'No Chats' : 'No Users'}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => (!search ? item.id : item.userId)}
          renderItem={({item}) =>
            !search ? (
              <ChatInfo item={item} />
            ) : (
              <UserInfo
                item={item}
                key={item.userId}
                resetHandler={resetHandler}
              />
            )
          }
        />
      </View>
    </View>
  );
};

export default UsersList;
