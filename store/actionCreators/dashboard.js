import {Alert} from 'react-native'
import {getUser,  enableLoader, disableLoader } from "../actions/auth"
import { useSelector } from "react-redux"
import {ApiUrl} from '../../constants/ApiUrl'
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';



export const editProfileHandler = (data, userDetails, profileSuccessHandler, photo)=>{
let userImgPath = photo.fileName 

    return async (dispatch) =>{     
        dispatch(enableLoader())
        try{     
        if(!photo?.notEdit){   
            const imageBucketPath= `/Assets/Images/${photo?.fileName}`
             const reference = storage().ref(imageBucketPath);
        
        const task =  await reference.putFile(photo?.uri);
   
        userImgPath =  await storage().ref(`/Assets/Images/${photo.fileName}`).getDownloadURL() 
           
            }
         

                const userData = {
                    ...userDetails,
                    firstName:data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber,
                    userImg: photo.notEdit  ? photo.uri : userImgPath
                    
                    
                }

               updateUserDetails(dispatch, userData, profileSuccessHandler)
            }
            catch(error){
                console.log(error)
                Alert.alert('',error.message)
                dispatch(disableLoader())
            }
    }
   
}



const updateUserDetails = async(dispatch, userData,  profileSuccessHandler)=>{


    try{
    // const response =await  fetch(`${ApiUrl}/user/${userData.userId}.json`
    // , {
    //     method: 'PUT',
    //     body: JSON.stringify(userData),
    //     headers: {
    //         'Content-Type': 'application/json'
    //       }
    // }
    // )

    // if (!response.ok) {
    //     throw new Error('Something went wrong!');
    //   }

    //   else{ 
//         const responseData =await response.json()
// console.log(responseData)


const response= await database().ref(`/users/${userData.userId}`).update(userData)

         dispatch(getUser(userData))

         Alert.alert('', 'Your profile updated successfully', [
             {
                
                 onPress: ()=>{
                    dispatch(disableLoader())
                     profileSuccessHandler()
                 }

             }
         ])
      
  
    //   }
     
     
    }
    
    catch(e){
        console.log(e)
        Alert.alert('',e.message)
        dispatch(disableLoader())
    }

    dispatch(disableLoader())
    
    
    }
