import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './style';

const AuthButton = props => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.style]}
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={0.7}
      testID={props.testID}>
      <Text style={styles.buttonText} allowFontScaling={false}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
