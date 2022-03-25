import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Ev,
} from 'react-native';
import Colors from '../../constants/Colors';
import UserInfo from '../../components/Chat/UserInfo';
import ChatInfo from '../../components/Chat/chatInfo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {get} from 'react-hook-form';
import dayjs from 'dayjs';

const placeholderImg = require('../../assets/placeholder.jpg');

const UsersList = () => {
  const [chatList, setChatList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);

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
          const response = await database()
            .ref(`/users/${chatUserId2}`)
            .once('value');
          const userChatData = response.val();
          chatListData.push({...chatData, id: data.key, userChatData});
        }

        if (totalChatCount === index + 1) {
          chatListData.sort((a, b) => {
            return (
              dayjs(b.recentChat.createdDate).unix() -
              dayjs(a.recentChat.createdDate).unix()
            );
          });

          setChatList(chatListData);
        }
      });
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

  return (
    <View style={styles.screen}>
      <View style={styles.searchUserContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.black}
          multiline={true}
          style={styles.searchUser}
          value={search}
          onChangeText={searchHandler}
          ref={searchRef}
        />
        <TouchableOpacity
          onPress={() => searchRef.current.focus()}
          activeOpacity={0.6}>
          <Icon name="search" color={Colors.black} size={22} />
        </TouchableOpacity>
      </View>

      <View style={styles.usersListContainer}>
        {search === '' ? (
          <FlatList
            contentContainerStyle={styles.usersList}
            initialNumToRender={5}
            data={chatList}
            ListEmptyComponent={() => (
              <View>
                <Text style={styles.noTitle}>No Chats</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            // onEndReached={() => console.log('end')}
            renderItem={({item}) => <ChatInfo item={item} />}
          />
        ) : (
          <FlatList
            contentContainerStyle={styles.usersList}
            initialNumToRender={5}
            data={searchUsers}
            ListEmptyComponent={() => (
              <View>
                <Text style={styles.noTitle}>No Users</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.userId}
            renderItem={({item}) => (
              <UserInfo
                item={item}
                key={item.userId}
                resetHandler={resetHandler}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    flexGrow: 1,
  },
  usersListContainer: {
    width: '100%',
    padding: 10,
    // height: '85%',
  },
  usersList: {},
  searchUserContainer: {
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: Colors.inputField,
  },
  searchUser: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.black,
    width: '90%',
  },
  noTitle: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: Colors.black,
  },
});

export default UsersList;
