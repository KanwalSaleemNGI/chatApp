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
import { signUpHandler, logOutHandler } from '../../store/actionCreators/auth'
import {useDispatch , useSelector} from 'react-redux'
import ShowLoader from '../../components/Authentication/ShowLoader'
import ImagePicker from '../../components/Authentication/ImagePicker'



const placeholderPath = '../../assets/placeholder.jpg'

const SignupForm = ({navigation}) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state=> state.auth.isLoading)
    const [imageModal, setImageModal] = useState(false)
    const [photo, setPhoto] = useState();
 
 const firstNameRef = useRef()
 const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const phoneNumberRef = useRef()
  
  

  const {
    control,
    handleSubmit,
    formState: {errors},
    register,
    reset,
    setError,
    setValue,
  } = useForm()

  const firstName = register('firstName')
  const phoneNumber = register('phoneNumber')
  const lastName = register('lastName')
  const email = register('email')
  const password = register('password')



  const onSubmit = (data)=>{
dispatch(signUpHandler(data, photo))
  }
 

  
  return isLoading ? <ShowLoader/> :
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <ScrollView contentContainerStyle={styles.screen}>

<ImagePicker photo={photo} imageModal={imageModal} setImageModal={setImageModal} setPhoto={setPhoto}/>
         
    <Input
            style={styles.input}
            control={control}
            rules={{
              required: 'First Name is Required',
            }}
            errors={errors.firstName}
            name="firstName"
            placeholder="First Name"
            ref={(e) => {
             firstName.ref(e)
              firstNameRef.current = e
            }}
            onSubmitEditing={() => {
              lastNameRef.current.focus()
            }}
            blurOnSubmit={false}
            returnKeyType="next"
          />
          {errors.firstName && (
            <Text style={styles.errorText} allowFontScaling={false}>
              {errors.firstName.message}
            </Text>
          )}
          <Input
            style={styles.input}
            control={control}
            rules={{
              required: 'Last Name is Required',
            }}
            errors={errors.lastName}
            name="lastName"
            placeholder="Last Name"
            ref={(e) => {
              lastName.ref(e)
              lastNameRef.current = e
            }}
            onSubmitEditing={() => {
                phoneNumberRef.current.focus()
            }}
            blurOnSubmit={false}
            returnKeyType="next"
          />
          {errors.lastName && (
            <Text style={styles.errorText} allowFontScaling={false}>
              {errors.lastName.message}
            </Text>
          )}


<Input
            style={styles.input}
            control={control}
            rules={{
              required: 'Phone Number is Required',
              minLength: {value: 9, message: 'Minimum 9 digits Requires'},
            //   maxLength: {value: 15, message: 'Minimum 6 characters Requires'},
            maxLength: 15
            }}
            maxLength={15}
            errors={errors.lastName}
            name="phoneNumber"
            placeholder="Phone Number"
            ref={(e) => {
             phoneNumber.ref(e)
             phoneNumberRef.current = e
            }}
            onSubmitEditing={() => {
              emailRef.current.focus()
            }}
            keyboardType={'phone-pad'}
            blurOnSubmit={false}
            returnKeyType="next"
          />
          {errors.phoneNumber && (
            <Text style={styles.errorText} allowFontScaling={false}>
              {errors.phoneNumber.message}
            </Text>
          )}
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
                minLength: {value: 6, message: 'Minimum 6 characters Requires'},
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
          Sign Up
        </AuthButton>

      


        <View style={styles.conditionContainer}>
          <Text style={styles.text} allowFontScaling={false}>
            Already have an account ? 
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('loginForm')}>
            <Text
              style={[styles.text, {color: Colors.primary}]}
              allowFontScaling={false}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        {/* {imagePickerModal()} */}
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
  
})

export default SignupForm
