import {convertMultiFactorInfoToServerFormat} from 'firebase-admin/lib/auth/user-import-builder';
import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width: '100%',
    borderRadius: 15,
    padding: 15,
  },
  appTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginTop: 5,
  },
  body: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    marginTop: 5,
  },
});

export default styles;
