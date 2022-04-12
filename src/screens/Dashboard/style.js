import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingVertical: 10,
  },

  infoContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 50,
  },
  optionsContainer: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 18,
    paddingVertical: 25,
    elevation: 5,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: 'hidden',
  },
  title: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Roboto-Regular',
  },
});

export default styles;
