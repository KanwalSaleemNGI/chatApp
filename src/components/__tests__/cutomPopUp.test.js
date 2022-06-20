import React from 'react';
import {render} from '@testing-library/react-native';
import {CustomPopUp} from '..';
import TestIds from '../../constants/TestIds';

describe('customPopUp comp', () => {
  const appTitle = 'chatApp';
  const title = 'Notification';
  const body = 'New message arrived';

  const renderHandler = () => {
    return render(
      <CustomPopUp appTitle={appTitle} title={title} body={body} />,
    );
  };
  it('should renders correctly', () => {
    const {toJSON} = renderHandler();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should properly renders the app title', () => {
    const {getByTestId} = renderHandler();

    expect(getByTestId(TestIds.customPopUp.appTitle).props.children).toEqual(
      appTitle,
    );
  });
  it('should properly renders the title', () => {
    const {getByTestId} = renderHandler();

    expect(getByTestId(TestIds.customPopUp.title).props.children).toEqual(
      title,
    );
  });
  it('should properly renders the body', () => {
    const {getByTestId} = renderHandler();

    expect(getByTestId(TestIds.customPopUp.body).props.children).toEqual(body);
  });
});
