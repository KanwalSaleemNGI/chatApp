import React, {useRef} from 'react';
import {Input} from '../';
import {fireEvent, render} from '@testing-library/react-native';
import TestIds from '../../constants/TestIds';
import {useForm} from 'react-hook-form';
import {renderHook, act} from '@testing-library/react-hooks';

const renderHandler = () => {
  const testInputRef = renderHook(() => useRef());

  const {
    control,
    handleSubmit,
    // formState: {errors},
    register,
  } = renderHook(() => useForm());

  // const testInput = register('testInput');
  return render(
    <Input
      // testID={TestIds.login.emailInput}
      placeholder="TestInput"
      ref={testInputRef}
      control={control}
      name="testInput"
      rules={{
        required: true,
      }}
      // errors={errors.email}
    ></Input>,
  );
};

describe('Input Comp', () => {
  it('should match snapshot', () => {
    const {toJSON} = renderHandler();
    expect(toJSON()).toMatchSnapshot();
  });
});
