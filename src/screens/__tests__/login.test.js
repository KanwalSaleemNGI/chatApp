import React from 'react';
import Login from '../Login/index';
import {fireEvent, render, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../../store/ConfigureStore';
import TestIds from '../../constants/TestIds';

// shows email is required
// shows password is required
// shows invalid email
//handled valid input submission

describe('Login Comp', () => {
  const emailIsRequired = 'Email is Required';
  const passwordIsRequired = 'Password is Required';
  const mustBeAValidEmail = 'Must be a valid Email';
  // const navigationMock = jest.fn();
  const renderHandler = () => {
    return render(
      <Provider store={store}>
        {/* <Login navigation={{navigate: navigationMock}} /> */}
        <Login />
      </Provider>,
    );
  };

  //snapshot match test
  it('it should matches to snapshot', () => {
    const {toJSON} = renderHandler();

    expect(toJSON()).toMatchSnapshot();
  });

  //rendered elements test
  it('it should renders default elements', () => {
    const {getByPlaceholderText, getByText} = renderHandler();

    getByText('Login');

    getByPlaceholderText('Email');
    getByPlaceholderText('Password');
  });

  //client side validation
  it('it should shows error message if all fields are empty', async () => {
    const {getByTestId, getByText} = renderHandler();

    await fireEvent.press(getByTestId(TestIds.authButton.onPress));
    getByText(emailIsRequired);
    getByText(passwordIsRequired);
  });

  it('it should shows "Email is Required" error message', async () => {
    const {getByTestId, getByText, queryAllByText} = renderHandler();

    fireEvent.changeText(getByTestId(TestIds.login.passwordInput), '123456');
    await fireEvent.press(getByTestId(TestIds.authButton.onPress));
    getByText(emailIsRequired);
    expect(queryAllByText(passwordIsRequired).length).toBe(0);

    // debug();
  });

  it('it should shows "Password is Required" error message', async () => {
    const {getByTestId, getByText, queryAllByText} = renderHandler();

    fireEvent.changeText(
      getByTestId(TestIds.login.emailInput),
      'aaa@gmail.com',
    );
    await fireEvent.press(getByTestId(TestIds.authButton.onPress));
    getByText(passwordIsRequired);
    expect(queryAllByText(emailIsRequired).length).toBe(0);

    // debug();
  });

  it('it should shows "Must be a valid Email" error message', async () => {
    const {getByTestId, getByText, queryAllByText} = renderHandler();

    fireEvent.changeText(getByTestId(TestIds.login.emailInput), 'aaa');
    fireEvent.changeText(getByTestId(TestIds.login.passwordInput), '123456');
    await fireEvent.press(getByTestId(TestIds.authButton.onPress));
    getByText(mustBeAValidEmail);

    expect(queryAllByText(emailIsRequired).length).toBe(0);
    expect(queryAllByText(passwordIsRequired).length).toBe(0);

    // debug();
  });

  it('it should handles valid input submission', async () => {
    // fetch.mockResponseOnce(JSON.stringify({passes: true}));
    const {getByTestId} = renderHandler();

    fireEvent.changeText(
      getByTestId(TestIds.login.emailInput),
      'aaa@gmail.com',
    );
    fireEvent.changeText(getByTestId(TestIds.login.passwordInput), '123456');
    await fireEvent.press(getByTestId(TestIds.authButton.onPress));
  });
});
