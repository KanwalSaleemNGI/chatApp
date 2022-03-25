import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {userDetails: null, isLoading: false};




const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETUSER': {
      return {
        ...state,
        userDetails: action.userDetails,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        userDetails: null,
      };
    }

    case 'ENABLELOADER': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'DISABLELOADER': {
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
