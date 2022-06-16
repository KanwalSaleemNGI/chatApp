import React from 'react';
import {AuthButton} from '../';
import {fireEvent, render} from '@testing-library/react-native';
import TestIds from '../../constants/TestIds';

describe('AuthButton comp', () => {
  const authButtonTitle = 'Login';

  const onPress = jest.fn();

  const renderHandler = () => {
    return render(<AuthButton onPress={onPress}>{authButtonTitle}</AuthButton>);
  };

  it('should renders correctly', () => {
    //arrange
    const {toJSON} = renderHandler();

    //act

    //assert
    expect(toJSON()).toMatchSnapshot();
  });

  it('should properly render the AuthButton title', () => {
    //arrange
    const {getByTestId} = renderHandler();

    //act

    //assert
    expect(getByTestId(TestIds.authButton.title).props.children).toEqual(
      authButtonTitle,
    );
  });

  it('should press AuthButton', () => {
    //arrange
    const {getByTestId} = renderHandler();

    //act
    fireEvent(getByTestId(TestIds.authButton.onPress), 'press');

    //assert
    expect(onPress).toHaveBeenCalled();
  });
});
