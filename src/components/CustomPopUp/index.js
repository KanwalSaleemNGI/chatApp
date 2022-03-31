import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const CustomPopUp = ({appIconSource, appTitle, timeText, title, body}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>{appTitle}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

export default CustomPopUp;
