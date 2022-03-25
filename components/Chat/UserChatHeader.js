import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'


const UserChatHeader = (props) => {
  const navigation = useNavigation()
  const{chatUserDetails} = props

    return(
        <View style={styles.screen}>
 <TouchableOpacity onPress={() =>navigation.goBack()}>
        <Text
          style={styles.backTitle}
          allowFontScaling={false}>
          Back
        </Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
    <Image source={{uri: chatUserDetails.userImg}} style={styles.profileImage}/>
    </View>
        <View style={styles.titleContainer}>
<Text style={styles.title}>{chatUserDetails.firstName} {chatUserDetails.lastName}</Text>
</View>
</View>

<TouchableOpacity activeOpacity={0.6} onPress={()=> {}}>
<Icon name='more-vert' size={22} color={Colors.black}/>
</TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
backgroundColor:Colors.inputField,
padding: 10,
width: '100%',
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between'
    },
    backTitle: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: Colors.primary,
    },
    profileContainer:{
        width: '80%',
flexDirection: "row",
alignItems: "center",
    },
    imageContainer:{
    width: '20%',
    },
    profileImage:{
width: 50,
height: 50,
borderRadius: 25
    },
    titleContainer:{  
        width:'80%',
marginHorizontal: 5,
justifyContent:'center',
},
    title:{
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        color: Colors.black
    },
})

export default UserChatHeader