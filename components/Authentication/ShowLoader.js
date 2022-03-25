import React from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'

const ShowLoader = ()=> {
    return(
        <View style={styles.activity}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
}




const styles = StyleSheet.create({
    activity: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.backgroundColor,
  
    },
})


export default ShowLoader