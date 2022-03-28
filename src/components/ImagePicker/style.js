import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: Colors.primary,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
  },
  inputIcon: {
    alignSelf: 'center',
  },
  imageModalContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  modalButtonsContainer: {
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: Colors.black,
    fontFamily: 'Roboto-Medium',
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});

export default styles;
