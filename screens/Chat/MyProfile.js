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
import {editProfileHandler} from '../../store/actionCreators/dashboard'
import {useDispatch, useSelector} from 'react-redux'
import ShowLoader from '../../components/Authentication/ShowLoader'
import ImagePicker from '../../components/Authentication/ImagePicker'
import storage from '@react-native-firebase/storage';



const MyProfile = ({navigation}) => {
    const dispatch = useDispatch()

    const userDetails = useSelector(state=> state.auth.userDetails)
  const isLoading = useSelector(state => state.auth.isLoading)
  const [photo,setPhoto] = useState();
  const [imageModal, setImageModal] = useState(false)



 const firstNameRef = useRef()
const lastNameRef = useRef()
  const emailRef = useRef()
  const phoneNumberRef = useRef()

  let userImg
  


  const {
    control,
    handleSubmit,
    formState: {errors},
    register,
    reset,
    setError,
    // setValue,
  } = useForm()

  const firstName = register('firstName')
  const lastName = register('lastName')
  const phoneNumber = register('phoneNumber')
  const email = register('email')
  

  const onSubmit = (data)=>{
console.log(data)

dispatch(editProfileHandler(data, userDetails, profileSuccessHandler,photo))
  }

  const profileSuccessHandler =()=>{
    navigation.goBack()
  }

  const getImageUrl = async()=>{
  
   setPhoto({
    uri: userDetails.userImg,
    notEdit : true
   })
  
  }

 


  useEffect(()=> {
    getImageUrl()
    reset({
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      phoneNumber: userDetails?.phoneNumber,
      email: userDetails?.email,
    });
  },[userDetails?.firstName, userDetails?.lastName, userDetails?.phoneNumber, userDetails?.email, reset ])



 
  console.log(errors)
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
            emailRef.current.blur()
          }}
          blurOnSubmit={false}
          returnKeyType="next"
          keyboardType="email-address"
          editable={false}
          
        />
        {errors.email && (
          <Text style={styles.errorText} allowFontScaling={false}>
            {errors.email.message}
          </Text>
        )}



             <AuthButton
          style={styles.buttonContainer}
          onPress={handleSubmit(onSubmit)}>
          Edit Profile
        </AuthButton>


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
 
})

export default MyProfile
