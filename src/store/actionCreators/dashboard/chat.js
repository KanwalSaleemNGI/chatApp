import {Alert} from 'react-native';
import database from '@react-native-firebase/database';
import {getAllUsers, getAllChats} from '../../actions/dashboard';
import {disableLoader} from '../../actions/auth';
import dayjs from 'dayjs';

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

export const sendMessageAsync = messageInfo => {
  async function sendMessageRequest(dispatch) {
    const {
      messageData,
      messageType,
      images,
      chatId,
      deviceToken,
      chatUserDetails,
      userDetails,
    } = messageInfo;

    // try {
    const messageRes = await database()
      .ref(`/chat/${chatId}/messages`)
      .push()
      .set(messageData);

    const chatRes = await database()
      .ref(`/chat/${chatId}`)
      .update({
        recentChat: {
          ...messageData,
          senderDeviceToken: deviceToken,
          receiverDeviceToken: chatUserDetails.deviceToken,
        },
      });
    console.log('messageRes:', messageRes, 'chatRes', chatRes);

    dispatch(getAllChatsAsync(userDetails.userId));

    //send notification to firebase

    // const resposne = await fetch(
    //   'https://fcm.googleapis.com/v1/projects/chatapp-10719/messages:send',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization:
    //         'Bearer ya29.A0ARrdaM-33jUWm3fwo2PAzU0r5cKo6XtS29knumAF_SGl4Zcae6s7fKzGsQWjHrxdQ0EtNcdZkoy0-AH8lp_kiOgXdLPvWdUclcyGz5Z0ehl4-mxVKqhwttFJiBCocmZSJb88IecAFVq00EhdDnOAf1xmuExE',
    //     },
    //     body: JSON.stringify({
    //       message: {
    //         token: userDetails.deviceToken,
    //         data: {},
    //         notification: {
    //           body: messageData?.text,
    //           title: `${chatUserDetails.firstName}${chatUserDetails.lastName}`,
    //         },
    //       },
    //     }),
    //   },
    // );
    // const responseData = await resposne.json();
    // } catch (e) {
    //   console.log(e.message);
    //   Alert.alert('', e.message);
    // }
  }

  sendMessageRequest.interceptInOffline = true;
  sendMessageRequest.meta = {
    retry: true,
    name: 'sendMessageAsync',
    args: [messageInfo],
  };
  return sendMessageRequest;
};
