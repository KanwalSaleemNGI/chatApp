import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.backgroundColor,
  },
  screen: {
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: Colors.backgroundColor,
  },

  usersListContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
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
