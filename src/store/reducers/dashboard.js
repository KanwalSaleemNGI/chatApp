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

    default:
      return state;
  }
};

export default dashboardReducer;
