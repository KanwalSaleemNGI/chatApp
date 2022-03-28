import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  userContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.inputField,
    borderRadius: 10,
    padding: 10,
  },
  profileContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: '20%',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  titleContainer: {
    width: '80%',
    marginHorizontal: 5,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.black,
  },
  timeContainer: {
    width: '20%',
    alignItems: 'flex-end',
  },
});

export default styles;
