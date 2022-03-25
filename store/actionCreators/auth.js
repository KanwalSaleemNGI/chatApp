import {
  login,
  signUp,
  logout,
  getUser,
  enableLoader,
  disableLoader,
} from '../actions/auth';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {ApiUrl} from '../../constants/ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {useReducer} from 'react';

export const loginHandler = userDetails => {
  return async dispatch => {
    dispatch(enableLoader());
    try {
      const firebaseData = await auth().signInWithEmailAndPassword(
        userDetails.email,
        userDetails.password,
      );

      if (firebaseData.user.uid) {
        const userData = {...userDetails, userId: firebaseData.user.uid};
        getUserDetails(dispatch, firebaseData.user.uid);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('', e.message);
      dispatch(disableLoader());
    }

    dispatch(disableLoader());
  };
};

export const googleSignInHandler = () => {
  return async dispatch => {
    try {
      await GoogleSignin.hasPlayServices();
      const googleUser = await GoogleSignin.signIn();
      console.log('google user', googleUser);
      // const userData =await auth.signInWithCredential(userInfo);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        googleUser.idToken,
      );

      dispatch(enableLoader());
      // Sign-in the user with the credential
      const firebaseUser = await auth().signInWithCredential(googleCredential);

      console.log('firebase user', firebaseUser);

      if (firebaseUser.user.uid) {
        const userData = {
          firstName: firebaseUser.user.displayName,
          lastName: '',
          email: firebaseUser.user.email,
          phoneNumber: firebaseUser.user.phoneNumber,
          userId: googleUser.user.id,
          platformType: 'google',
          platformId: firebaseUser.user.uid,
          userImg: firebaseUser.user.photoURL,
        };

        postUserDetails(dispatch, userData);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('', error.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        Alert.alert('', error.message);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('', error.message);
      } else {
        // some other error happened
        Alert.alert('', error.message);
      }
      dispatch(disableLoader());
    }
    dispatch(disableLoader());
  };
};

export const fbSignInHandler = () => {
  return async dispatch => {
    try {
      //     //  Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      // Once signed in, get the users AccesToken
      dispatch(enableLoader());
      const data = await AccessToken.getCurrentAccessToken();

      console.log('data', data);
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }

      // getInfoFromToken(data.accessToken.toString());
      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      console.log('fbUser', facebookCredential);

      // Sign-in the user with the credential
      const firebaseUser = await auth().signInWithCredential(
        facebookCredential,
      );
      console.log('firebaseUser', firebaseUser);

      if (firebaseUser.user.uid) {
        const userImg =
          firebaseUser.additionalUserInfo.profile.picture.data.url;

        const userData = {
          firstName: firebaseUser.additionalUserInfo.profile.first_name,
          lastName: firebaseUser.additionalUserInfo.profile.last_name,
          email: firebaseUser.user.email,
          phoneNumber: firebaseUser.user.phoneNumber,
          userId: firebaseUser.additionalUserInfo.profile.id,
          platformType: 'facebook',
          platformId: firebaseUser.user.uid,
          userImg: userImg,
        };

        postUserDetails(dispatch, userData);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('', error?.message ? error.message : error);
      dispatch(disableLoader());
    }
  };
};

export const signUpHandler = (userDetails, photo) => {
  return async dispatch => {
    dispatch(enableLoader());
    try {
      if (photo?.fileName) {
        const imageBucketPath = `/Assets/Images/${photo?.fileName}`;
        const reference = storage().ref(imageBucketPath);

        const task = await reference.putFile(photo?.uri);
        console.log(task);
      }

      const firebaseData = await auth().createUserWithEmailAndPassword(
        userDetails.email,
        userDetails.password,
      );
      const imageName = photo?.fileName ? photo.fileName : 'placeholder.jpg';

      if (firebaseData.user.uid) {
        const userData = {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
          userId: firebaseData.user.uid,
          platformType: null,
          platformId: null,

          userImg: await storage()
            .ref(`/Assets/Images/${imageName}`)
            .getDownloadURL(),
        };

        console.log(userData);
        postUserDetails(dispatch, userData);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('', e.message);
      dispatch(disableLoader());
    }

    dispatch(disableLoader());
  };
};

const postSocialUser = async (dispatch, userData) => {
  console.log(userData.userId);
  try {
    const response = await database()
      .ref(`/users/${userData.userId}`)
      .once('value');
    const userDetails = response.val();
    if (userDetails?.userId) {
      dispatch(getUser(userDetails));
    } else {
      postUserDetails(dispatch, userData);
    }
  } catch (e) {
    console.log(e);
    Alert.alert('', e.message);
    dispatch(disableLoader());
  }
  dispatch(disableLoader());
};

const postUserDetails = async (dispatch, userData) => {
  try {
    const response = await database()
      .ref(`/users/${userData.userId}`)
      .set(userData);
    console.log('response', response);

    getUserDetails(dispatch, userData.userId);

    dispatch(getUser(userData));
  } catch (e) {
    console.log(e);
    Alert.alert('', e.message);
    dispatch(disableLoader());
  }
};

const getUserDetails = async (dispatch, userId) => {
  try {
    const response = await database().ref(`/users/${userId}`).once('value');

    const userDetails = response.val();
    if (userDetails.userId) {
      dispatch(getUser(userDetails));
    }
  } catch (e) {
    console.log(e);
    Alert.alert('', e.message);
    dispatch(disableLoader());
  }
};

export const logOutHandler = userDetails => {
  return async dispatch => {
    dispatch(enableLoader());
    try {
      // const user = auth().getUser();
      // console.log('úser',user)

      const fbUser = await AccessToken.getCurrentAccessToken();
      if (fbUser) {
        LoginManager.logOut();
      }

      if (userDetails?.platformType === 'google') {
        googleSignOut();
        await auth()
          .currentUser.delete()
          .then(user => console.log('deleted'));
        dispatch(logout());
        dispatch(disableLoader());
        return;
      }

      await auth()
        .signOut()
        .then(user => {
          console.log('LOGOUT Successfully');
        });
      dispatch(logout());
    } catch (e) {
      console.log(e);
      Alert.alert('', e.message);
      dispatch(disableLoader());
    }

    dispatch(disableLoader());
  };
};

const googleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};
