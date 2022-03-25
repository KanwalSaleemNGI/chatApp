import React, {forwardRef} from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import {useController} from 'react-hook-form'
import Colors from '../../constants/Colors'

const Input =forwardRef((props, ref)  => {
  const {field} = useController({
    control: props.control,
    defaultValue: '',
    name: props.name,
    rules: props.rules,
  })

  return (
    <View style={[styles.inputContainer, props.containerStyle, props.errors && styles.errorBorder,]}>
      <TextInput
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
  )
})

const styles = StyleSheet.create({

  inputContainer: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor:Colors.inputField,
    borderColor:Colors.inputBorder,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    color: Colors.black,
    height: 50,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    paddingHorizontal: 10,
    flexBasis: '100%',
  },
 
  errorBorder: {
    borderColor: Colors.common.errorColor
  },
})

export default Input