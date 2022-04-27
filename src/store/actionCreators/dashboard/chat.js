import {Alert} from 'react-native';
import {dispatch} from 'jest-circus/build/state';
import database from '@react-native-firebase/database';
import {getAllUsers, getAllChats} from '../../actions/dashboard';
import {disableLoader, enableLoader} from '../../actions/auth';
import dayjs from 'dayjs';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export const getAllUsersAsync = userId => {
  return async dispatch => {
    try {
      const response = await database().ref(`/users`).once('value');
      const responseData = response.val();
      const allUsersData = [];

      for (const key in responseData) {
        allUsersData.push(responseData[key]);
      }
      const filteredUsers = allUsersData.filter(item => item.userId !== userId);

      dispatch(getAllUsers(filteredUsers));
    } catch (e) {
      console.log(e);
      Alert.alert('', e.message);
      dispatch(disableLoader());
    }
  };
};

export const getAllChatsAsync = userId => {
  return async dispatch => {
    try {
      await database()
        .ref(`chat`)
        .orderByValue()
        .once('value', function (snapshot) {
          let chatListData = [];

          if (snapshot.val()) {
            const totalChatCount = Object.keys(snapshot.val()).length;
            snapshot.forEach(async (data, index) => {
              const chatData = data.val();
              if (
                userId === chatData?.recentChat?.senderId ||
                userId === chatData?.recentChat?.receiverId
              ) {
                const chatUserId2 =
                  userId === chatData.recentChat.senderId
                    ? chatData.recentChat.receiverId
                    : chatData.recentChat.senderId;

                let messages = [];
                Object.values(chatData.messages).forEach(message => {
                  messages.push(message);
                });

                chatListData.push({
                  recentChat: chatData.recentChat,
                  messages: messages,
                  id: data.key,
                  chatUserId2,
                });
              }

              if (totalChatCount === index + 1) {
                let chatData = [];
                chatListData.map(async (chat, index) => {
                  const response = await database()
                    .ref(`/users/${chat.chatUserId2}`)
                    .once('value');
                  const userChatData = response.val();
                  chatData.push({
                    messages: chat.messages,
                    id: chat.id,
                    userChatData: userChatData,
                    recentChat: chat.recentChat,
                  });

                  if (chatListData.length === index + 1) {
                    chatData.sort((a, b) => {
                      return (
                        dayjs(b.recentChat.createdDate).unix() -
                        dayjs(a.recentChat.createdDate).unix()
                      );
                    });
                  }

                  dispatch(getAllChats(chatData));
                });
              }
            });
          }
        });
    } catch (e) {
      console.log(e);
      Alert.alert('', e.message);
      dispatch(disableLoader());
    }
  };
};
