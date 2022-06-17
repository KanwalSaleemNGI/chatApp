import React from 'react';
import {ChatInfo} from '../';
import {fireEvent, render} from '@testing-library/react-native';
import TestIds from '../../constants/TestIds';
import {NavigationContainer} from '@react-navigation/native';

describe('chatInfo comp', () => {
  const onPress = jest.fn();
  const imageUrl =
    'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=';
  const firstName = 'Kanwal';
  const lastName = 'saleem';
  const message = 'Hi';
  const date = '10/10/2022';

  const renderHandler = () => {
    return render(
      <ChatInfo
        item={{
          recentChat: {text: message, createdDate: date},
          userChatData: {
            userImg: imageUrl,
            firstName,
            lastName,
          },
        }}
      />,
    );
  };

  it('should match snapshot', () => {
    //arrange
    const {toJSON} = renderHandler();

    //act

    //assert
    expect(toJSON()).toMatchSnapshot();
  });

  it('should properly render the image & name', () => {
    //arrange
    const {getByTestId, queryByTestId} = renderHandler();

    //act

    //assert
    expect(queryByTestId(TestIds.chatInfo.image)).toBeTruthy();
    expect(getByTestId(TestIds.chatInfo.name).props.children).toEqual(
      `${firstName} ${lastName}`,
    );
  });

  it('should properly renders mesaage', () => {
    const {getByTestId} = renderHandler();

    expect(getByTestId(TestIds.chatInfo.messageText).props.children).toEqual(
      message,
    );
  });
  it('should properly renders date', () => {
    const {getByTestId} = renderHandler();

    expect(getByTestId(TestIds.chatInfo.date).props.children).toEqual(date);
  });

  it('should properly press the button', () => {
    const {getByTestId} = renderHandler();
    fireEvent(getByTestId(TestIds.chatInfo.onPress), 'press');
    // expect(onPress).toHaveBeenCalled();
  });
});
