import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.inputField,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
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
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: Colors.black,
  },
});

export default styles;
