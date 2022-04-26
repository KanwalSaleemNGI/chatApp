import {offlineActionTypes} from 'react-native-offline';
import Actions from '../../constants/Actions';

const initialState = {allChats: [], allUsers: []};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case offlineActionTypes.FETCH_OFFLINE_MODE: {
      // do something in your reducer
      return state;
    }
    case Actions.getAllUsers: {
      return {
        ...state,
        allUsers: action.allUsers,
      };
    }
    case Actions.getAllChats: {
      return {
        ...state,
        allChats: action.allChats,
      };
    }
    case Actions.createNewChat: {
      return {
        ...state,
        allChats: [
          ...state.allChats,
          {
            id: action.chatId,
            messages: [],
            recentChat: null,
            userChatData: action.userChatData,
          },
        ],
      };
    }
    case Actions.createNewMessage: {
      const updatedChats = state.allChats.map(item => {
        if (item.id === action.chatId) {
          return {
            ...item,
            recentChat: action.message,
            messages: [...item.messages, action.message],
          };
        }

        return item;
      });

      return {
        ...state,
        allChats: updatedChats,
      };
    }

    default:
      return state;
  }
};

export default dashboardReducer;
