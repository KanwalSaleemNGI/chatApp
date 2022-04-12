import React, {forwardRef} from 'react';
import {View, TextInput, Alert, Keyboard} from 'react-native';
import {useController} from 'react-hook-form';
import Colors from '../../constants/Colors';
import styles from './style';

const Input = forwardRef((props, ref) => {
  const {field} = useController({
    control: props.control,
    defaultValue: '',
    name: props.name,
    rules: props.rules,
  });

  return (
    <View
      style={[
        styles.inputContainer,
        props.containerStyle,
        props.errors && styles.errorBorder,
      ]}>
      <TextInput
        onBlur={props.onBlur}
        // onBlur={() => Keyboard.dismiss()}
        testID={props.testID}
        value={field.value}
        onChangeText={field.onChange}
        style={[styles.input, props.style]}
        placeholder={props.placeholder}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        returnKeyType={props.returnKeyType || 'next'}
        focusable={true}
        keyboardType={props.keyboardType}
        onSubmitEditing={props.onSubmitEditing}
        blurOnSubmit={props.blurOnSubmit}
        maxLength={props.maxLength}
        editable={props.editable}
        placeholderTextColor={Colors.black}
        ref={ref}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
});

export default Input;
