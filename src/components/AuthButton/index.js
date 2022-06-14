import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './style';
import TestIds from '../../constants/TestIds';

const AuthButton = props => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.style]}
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={0.7}
      testID={TestIds.authButton.onPress}>
      <Text
        style={styles.buttonText}
        allowFontScaling={false}
        testID={TestIds.authButton.title}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
