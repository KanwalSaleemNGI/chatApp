import React from 'react';
import ImageView from 'react-native-image-viewing';
import {View} from 'react-native';

const ImageViewer = ({route, navigation}) => {
  const images = route.params;

  return (
    <ImageView
      images={images}
      imageIndex={0}
      visible={true}
      onRequestClose={() => navigation.goBack()}
    />
  );
};

export default ImageViewer;
