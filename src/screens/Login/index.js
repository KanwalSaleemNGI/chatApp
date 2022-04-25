import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {AuthButton, ShowLoader, Input} from '../../components';
import {
  loginHandler,
  googleSignInHandler,
  fbSignInHandler,
} from '../../store/actionCreators/auth/auth';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import styles from './style';
import Colors from '../../constants/Colors';

const LoginForm = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const emailRef = useRef();
  const passwordRef = useRef();

  const {
    control,
    handleSubmit,
    formState: {errors},
    register,
    reset,
    setError,
    // setValue,
  } = useForm();

  const email = register('email');
  const password = register('password');

  const onSubmit = data => {
    console.log(data);
    dispatch(loginHandler(data));
  };

  const googleSignIn = () => {
    dispatch(googleSignInHandler());
  };

  const facebookSignIn = () => {
    dispatch(fbSignInHandler());
  };

  const [inputValue, setInputValue] = useState('');
  console.log(errors);
  return isLoading ? (
    <ShowLoader />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        testID="loginView">
        <View style={styles.screen}>
          <Input
            testID="emailInput"
            style={styles.input}
            container={{marginTop: 60}}
            control={control}
            rules={{
              required: 'Email is Required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Must be a valid Email',
              },
            }}
            errors={errors.email}
            name="email"
            placeholder="Email"
            ref={e => {
              email.ref(e);
              emailRef.current = e;
            }}
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
            blurOnSubmit={false}
            returnKeyType="next"
            keyboardType="email-address"
          />
          {errors.email && (
            <Text style={styles.errorText} allowFontScaling={false}>
              {errors.email.message}
            </Text>
          )}
          <Input
            testID="passwordInput"
            style={styles.input}
            control={control}
            name="password"
            placeholder="Password"
            rules={{
              required: 'Password is Required',
            }}
            errors={errors.password}
            ref={e => {
              password.ref(e);
              passwordRef.current = e;
            }}
            onSubmitEditing={() => {
              passwordRef.current.blur();
            }}
            secureTextEntry={true}
            blurOnSubmit={false}
            returnKeyType="next"
          />
          {errors.password && (
            <Text style={styles.errorText} allowFontScaling={false}>
              {errors.password.message}
            </Text>
          )}

          <AuthButton
            style={styles.buttonContainer}
            onPress={handleSubmit(onSubmit)}
            testID="loginButton">
            Login
          </AuthButton>

          <View style={styles.conditionContainer}>
            <Text style={styles.text} allowFontScaling={false}>
              Don’t have an account ?
            </Text>
            <TouchableOpacity
              testID="signUpButton"
              activeOpacity={0.7}
              onPress={() => navigation.navigate('signUpForm')}>
              <Text
                style={[styles.text, {color: Colors.primary}]}
                allowFontScaling={false}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialMainContainer}>
            <Text style={styles.text} allowFontScaling={false}>
              Login with
            </Text>
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialLogoContainer}
                onPress={googleSignIn}>
                <Image
                  source={require('../.././assets/images/googleImg.jpg')}
                  style={styles.socialLogo}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialLogoContainer}
                onPress={facebookSignIn}>
                <Image
                  source={require('../.././assets/images/facebookImg.jpg')}
                  style={styles.socialLogo}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
