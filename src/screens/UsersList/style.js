import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    flexGrow: 1,
  },
  usersListContainer: {
    width: '100%',
    padding: 10,
  },
  usersList: {},
  searchUserContainer: {
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: Colors.inputField,
  },
  searchUser: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.black,
    width: '90%',
  },
  noTitle: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: Colors.black,
  },
});

export default styles;
