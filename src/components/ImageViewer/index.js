import React from 'react';
import ImageView from 'react-native-image-viewing';

const ImageViewer = props => {
  const images =
    props.messageImages.length > 0
      ? props.messageImages.map(image => ({
          uri: image.uri,
        }))
      : [];
  console.log('images', images);
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
