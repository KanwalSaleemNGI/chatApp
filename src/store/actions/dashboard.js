import Actions from '../../constants/Actions';

export const getAllChats = allChats => ({type: Actions.getAllChats, allChats});
export const getAllUsers = allUsers => ({type: Actions.getAllUsers, allUsers});

export const createNewChat = (chatId, userChatData) => ({
  type: Actions.createNewChat,
  chatId,
  userChatData,
});
export const createNewMessage = (message, chatId) => ({
  type: Actions.createNewMessage,
  chatId,
  message,
});

export const sendMessage = () => ({
  type: Actions.sendMessage,
});
