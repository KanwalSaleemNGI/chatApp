import React from 'react';
import ImageView from 'react-native-image-viewing';
import {View} from 'react-native';

const ImageViewer = props => {
  const images = props.messageImages.map(image => ({
    uri: image.uri,
  }));

  return (
    <ImageView
      images={images}
      imageIndex={0}
      visible={props.visible}
      onRequestClose={() => props.setVisible(false)}
      FooterComponent={props.footer}
    />
  );
};

export default ImageViewer;
