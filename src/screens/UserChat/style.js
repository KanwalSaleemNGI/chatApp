import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.backgroundColor,
    flexGrow: 1,
    alignItems: 'center',
    flex: 1,
  },
  searchUserContainer: {
    marginVertical: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  searchUser: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.black,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: Colors.inputField,
    borderRadius: 25,
    width: '80%',
    height: 50,
  },
  sendContainer: {
    width: '20%',
    paddingRight: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginHorizontal: 3,
    justifyContent: 'center',
  },
  userChatContainer: {
    // height: '80%',
    // marginVertical: 30,
    width: '100%',
    paddingHorizontal: 10,
  },

  noTitle: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: Colors.black,
  },
});

export default styles;
