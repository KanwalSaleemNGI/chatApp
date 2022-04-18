import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
  },
  messageContainer: {
    borderRadius: 10,
    justifyContent: 'space-between',
    padding: 10,
  },
  senderMessage: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
  },
  receiverMessage: {
    backgroundColor: Colors.inputField,
    alignSelf: 'flex-start',
  },

  message: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.black,
    maxWidth: '80%',
  },
  time: {
    alignSelf: 'flex-end',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: Colors.common.darkGrey,
    marginHorizontal: 5,
  },
  imageContainer: {
    maxWidth: '80%',
  },
  image: {
    maxWidth: '100%',
    height: 200,
    justifyContent: 'center',
  },
  imageTitle: {
    color: Colors.white,
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default styles;
