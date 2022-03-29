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
    fontFamily: 'Roboto-Regular',
  },
  buttonContainer: {
    marginTop: 30,
  },
  conditionContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Roboto-Bold',
    marginHorizontal: 2,
  },
  socialMainContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  socialContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLogoContainer: {
    marginHorizontal: 10,
  },
  socialLogo: {
    width: 40,
    height: 40,
  },
});

export default styles;
