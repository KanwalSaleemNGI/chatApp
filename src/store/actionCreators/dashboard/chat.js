import {Alert} from 'react-native';
import {dispatch} from 'jest-circus/build/state';
import database from '@react-native-firebase/database';
import {getAllUsers, getAllChats} from '../../actions/dashboard';
import {disableLoader, enableLoader} from '../../actions/auth';
import dayjs from 'dayjs';

// const fetchAllChats = snapshot => {
//   const chatListData = [];

//   //   if (snapshot.val()) {
//   //     const totalChatCount = Object.keys(snapshot.val()).length;

//   //     snapshot.forEach(async (data, index) => {
//   //       const chatData = data.val();
//   //   if (
//   //     userId === chatData?.recentChat?.senderId ||
//   //     userId === chatData?.recentChat?.receiverId
//   //   ) {
//   //     const chatUserId2 =
//   //       userId === chatData.recentChat.senderId
//   //         ? chatData.recentChat.receiverId
//   //         : chatData.recentChat.senderId;

//   //     chatListData.push({
//   //       ...chatData,
//   //       id: data.key,
//   //       chatUserId2,
//   //     });
//   //   }

//   //   if (totalChatCount === index + 1) {
//   //     let chatData = [];
//   //     chatListData.map(async (item, index) => {
//   //       const response = await database()
//   //         .ref(`/users/${item.chatUserId2}`)
//   //         .once('value');
//   //       const userChatData = response.val();

//   //       chatData.push({...item, userChatData: userChatData});
//   //       console.log(chatData);
//   //   if (chatListData.length === index + 1) {
//   //     chatData.sort((a, b) => {
//   //       return (
//   //         dayjs(b.recentChat.createdDate).unix() -
//   //         dayjs(a.recentChat.createdDate).unix()
//   //       );
//   //     });

//   //     setChatList(chatData);
//   //     setIsLoading(false);
//   //   }
//   // });
//   //   }
//   // });
//   //   } else {
//   //     // setIsLoading(false);
//   //   }
//   dispatch(disableLoader());
// };

// const fetchAllChats = async (dispatch, userId) => {
//   try {

//     chatRef.orderByValue().on('value', fetchChats);
//     dispatch(getAllChats(filteredUsers));
//   } catch (e) {
//     console.log(e);
//     Alert.alert('', e.message);
//     dispatch(disableLoader());
//   }
//   // setAllUsers(filteredUsers);
//   // setSearchUsers(filteredUsers);
// };
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
      dispatch(disableLoader());
    } catch (e) {
      console.log(e);
      Alert.alert('', e.message);
      dispatch(disableLoader());
    }
  };
};

// export const getAllChatsAsync = userId => {
//   dispatch(enableLoader());
//   return async dispatch => {
//     try {
//       await database()
//         .ref(`chat`)
//         .orderByValue()
//         .once('value', function (snapshot) {
//           const chatListData = [];
//           if (snapshot.val()) {
//             const totalChatCount = Object.keys(snapshot.val()).length;
//             snapshot.forEach(async (data, index) => {
//               const chatData = data.val();
//               if (
//                 userId === chatData?.recentChat?.senderId ||
//                 userId === chatData?.recentChat?.receiverId
//               ) {
//                 const chatUserId2 =
//                   userId === chatData.recentChat.senderId
//                     ? chatData.recentChat.receiverId
//                     : chatData.recentChat.senderId;
//                 chatListData.push({
//                   ...chatData,
//                   id: data.key,
//                   chatUserId2,
//                 });
//               }
//               if (totalChatCount === index + 1) {
//                 let chatData = [];
//                 chatListData.map(async (item, index) => {
//                   const response = await database()
//                     .ref(`/users/${item.chatUserId2}`)
//                     .once('value');
//                   const userChatData = response.val();
//                   chatData.push({...item, userChatData: userChatData});

//                   if (chatListData.length === index + 1) {
//                     chatData.sort((a, b) => {
//                       return (
//                         dayjs(b.recentChat.createdDate).unix() -
//                         dayjs(a.recentChat.createdDate).unix()
//                       );
//                     });
//                   }

//                   dispatch(getAllChats(chatData));
//                 });
//               }
//             });
//           }
//           dispatch(disableLoader());
//         });
//     } catch (e) {
//       console.log(e);
//       Alert.alert('', e.message);
//       dispatch(disableLoader());
//     }
//   };
// };
