import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    paddingTop: 20,
  },
  errorText: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: Colors.common.errorColor,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default styles;
