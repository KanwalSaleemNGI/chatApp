import {offlineActionTypes} from 'react-native-offline';
import Actions from '../../constants/Actions';

const initialState = {userDetails: null, isLoading: false};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case offlineActionTypes.FETCH_OFFLINE_MODE: {
      // do something in your reducer
      return state;
    }

    case Actions.getUser: {
      return {
        ...state,
        userDetails: action.userDetails,
      };
    }

    case Actions.logout: {
      return {
        ...state,
        userDetails: null,
      };
    }

    case Actions.enableLoader: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case Actions.disableLoader: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
