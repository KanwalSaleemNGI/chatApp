import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
  },
  messageContainer: {
    borderRadius: 10,
    flexDirection: 'row',
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  message: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.black,
    maxWidth: '80%',
  },
  time: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    // color: '#6f7571',
    color: Colors.black,
    textAlignVertical: 'bottom',
    marginHorizontal: 5,
  },
});

export default styles;
