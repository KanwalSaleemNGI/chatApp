import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import Colors from '../../constants/Colors';
import {UserInfo, ChatInfo} from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import styles from './style';

const UsersList = () => {
  const [chatList, setChatList] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef();

  const allUsers = useSelector(state => state.dashboard.allUsers);
  const [searchUsers, setSearchUsers] = useState(allUsers);

  const allChats = useSelector(state => state.dashboard.allChats);

  useEffect(() => {}, []);
  useEffect(() => {
    if (allChats.length > 0) {
      let chatListData = [];

      allChats.map(chat => {
        if (chat.messages.length > 0) {
          chatListData.push(chat);
        }
      });

      chatListData.sort((a, b) => {
        return (
          dayjs(b.recentChat.createdDate).unix() -
          dayjs(a.recentChat.createdDate).unix()
        );
      });

      setChatList(chatListData);
    }
  }, [allChats]);

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

  return (
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
