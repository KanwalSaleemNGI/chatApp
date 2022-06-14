import React from 'react';
import {Input} from '../';
import {fireEvent, render} from '@testing-library/react-native';
import TestIds from '../../constants/TestIds';

describe('Input Comp', () => {
  const emailRef = jest.fn();
  const control = jest.fn();
  const renderHandler = () => {
    return render(
      <Input
        testID={TestIds.login.emailInput}
        placeholder="Email"
        ref={emailRef}
        control={control}></Input>,
    );
  };

  it('should match snapshot', () => {
    const {toJson} = renderHandler();

    expect(toJson().toMatchSnapshot());
  });
});
