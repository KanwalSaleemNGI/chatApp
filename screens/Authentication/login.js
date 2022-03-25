import React, {useState, useRef, useEffect} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
  } from 'react-native'
import Input from '../../components/Authentication/Input'
import Colors from '../../constants/Colors'
import {useForm} from 'react-hook-form'
import AuthButton from '../../components/Authentication/AuthButton'
import { loginHandler, googleSignInHandler, fbSignInHandler } from '../../store/actionCreators/auth'
import {useDispatch, useSelector} from 'react-redux'
import ShowLoader from '../../components/Authentication/ShowLoader'
import { GoogleSignin } from '@react-native-google-signin/google-signin'




const LoginForm = ({navigation}) => {

 const dispatch = useDispatch()
 const isLoading = useSelector(state=>state.auth.isLoading)

 
  const emailRef = useRef()
  const passwordRef = useRef()

  const {
    control,
    handleSubmit,
    formState: {errors},
    register,
    reset,
    setError,
    // setValue,
  } = useForm()

  const email = register('email')
  const password = register('password')

  const onSubmit = (data)=>{
dispatch(loginHandler(data))
  }

  const googleSignIn = ()=> {
    dispatch(googleSignInHandler())
  }

  const facebookSignIn = ()=> {
    dispatch(fbSignInHandler())
  }
  


  




  console.log(errors)
  return isLoading ? <ShowLoader/> :
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <ScrollView contentContainerStyle={styles.screen}>
  
    <Input
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
          ref={(e) => {
            email.ref(e)
            emailRef.current = e
          }}
          onSubmitEditing={() => {
            passwordRef.current.focus()
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
            style={styles.input}
            control={control}
            name="password"
            placeholder="Password"
            rules={{
              required: 'Password is Required',
           
            }}
            errors={errors.password}
            ref={(e) => {
              password.ref(e)
              passwordRef.current = e
            }}
            onSubmitEditing={() => {
              passwordRef.current.blur()
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
          onPress={handleSubmit(onSubmit)}>
          Login
        </AuthButton>


        <View style={styles.conditionContainer}>
          <Text style={styles.text} allowFontScaling={false}>
            Don’t have an account ? 
          </Text>
          <TouchableOpacity
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
          <Text style={styles.text}
              allowFontScaling={false}>Login with</Text>
<View style={styles.socialContainer}>
  <TouchableOpacity style={styles.socialLogoContainer} 
  onPress={googleSignIn}
  >
<Image source={require('../../assets/googleImg.jpg')} style={styles.socialLogo}/>
</TouchableOpacity>
<TouchableOpacity style={styles.socialLogoContainer} onPress={facebookSignIn}>
<Image source={require('../../assets/facebookImg.jpg')} style={styles.socialLogo}/>
</TouchableOpacity>

</View>
        </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    paddingTop: 20,
  },
  errorText: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: Colors.common.errorColor,
    fontFamily: 'Roboto-Regular'
  },
  buttonContainer:{
    marginTop: 30
  },
  conditionContainer: {
    flexDirection: 'row',
    marginVertical: 20,
   
  },
  text: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Roboto-Bold',
    marginHorizontal: 2,
  },
  socialMainContainer:{
    alignItems: 'center',
    width: '100%',
    marginTop: 20
  },
  socialContainer:{
marginTop: 10,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center'
  },
  socialLogoContainer:{
    marginHorizontal: 10
  },
  socialLogo:{
    width: 40,
    height: 40,
    
  }

  
})

export default LoginForm
