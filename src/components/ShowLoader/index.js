import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Colors from '../../constants/Colors';
import styles from './style';

const ShowLoader = () => {
  return (
    <View style={styles.activity}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default ShowLoader;
