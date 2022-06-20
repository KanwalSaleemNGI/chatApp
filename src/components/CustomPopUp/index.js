import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import TestIds from '../../constants/TestIds';

const CustomPopUp = ({appTitle, title, body}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle} testID={TestIds.customPopUp.appTitle}>
        {appTitle}
      </Text>
      <Text style={styles.title} testID={TestIds.customPopUp.title}>
        {title}
      </Text>
      <Text style={styles.body} testID={TestIds.customPopUp.body}>
        {body}
      </Text>
    </View>
  );
};

export default CustomPopUp;
