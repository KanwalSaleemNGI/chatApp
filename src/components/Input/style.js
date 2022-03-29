import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.inputField,
    borderColor: Colors.inputBorder,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    color: Colors.black,
    height: 50,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    paddingHorizontal: 10,
    flexBasis: '100%',
  },

  errorBorder: {
    borderColor: Colors.common.errorColor,
  },
});

export default styles;
