import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
  },

  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },
});

export default styles;
