import React, {useCallback, useContext, useLayoutEffect, useState, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AuthButton from '../../components/Authentication/AuthButton'
import Colors from '../../constants/Colors'
import { logOutHandler } from '../../store/actionCreators/auth'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


const selectionOptions = [
  {
    name: 'My Profile',
    // image: require('../assets/myProfile.png'),
    icon: 'person',
    route: 'myProfile',
  },

  {
    name: 'My Chats',
    // image: require('../assets/myProfile.png'),
    icon: 'chat',
    route: 'usersList',
  },
 
]

const Dashboard = ({navigation}) => {
const dispatch = useDispatch()
  const [selected, setSelectedItem] = useState('')
  const userDetails = useSelector(state => state.auth.userDetails)

  useFocusEffect(
    useCallback(() => {
      setSelectedItem('')
    }, []),
  )

  
    
    

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity 
          onPress={()=>dispatch(logOutHandler(userDetails))}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Roboto-SemiBold',
                color: Colors.primary,
              }}
              allowFontScaling={false}>
              Log out
            </Text>
          </TouchableOpacity>
        )
      },
    })
  }, [])
  return (
   
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.infoContainer}>
          {selectionOptions.map((option) => (
            <TouchableOpacity
              key={option.route}
              style={styles.optionsContainer}
              onPress={() => {
                setSelectedItem(option.name)
                navigation.navigate(option.route)
              }}
              activeOpacity={0.8}>
               <Icon name={option.icon} color={Colors.black} size={30}/>
              <Text
                style={[
                  styles.title,
                  {color: selected === option.name ? Colors.primary : Colors.black},
                ]}
                allowFontScaling={false}>
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
     
   
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: Colors.backgroundColor,
    paddingBottom: 10,
    paddingTop: 10,
 
  },

  infoContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 50,
  },
  optionsContainer: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 18,
    paddingVertical: 25,
    elevation: 5,
    borderRadius: 10,
    shadowColor:  Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: 'hidden',
  },
  title: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Roboto-Regular',
  },
})

export default Dashboard
