import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Modal, Portal, Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './style';

const ImagePicker = props => {
  const {photo, setPhoto, imageModal, setImageModal, setImagePath} = props;

  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: "App Camera Permission",
  //         message:"App needs access to your camera ",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("Camera permission given");
  //       accessCamera()
  //     } else {
  //       console.log("Camera permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  //   setImageModal(false)
  // };

  const accessCamera = async () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        return Alert.alert('Cancelled', 'Module was cancelled', [
          {text: 'Cancel', style: 'cancel'},
        ]);
      }

      console.log(response.assets);

      setPhoto(response.assets ? response.assets[0] : undefined);
      setImageModal(false);
    });
  };

  // {Function to launch gallery for main photo}

  const accessGallery = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return Alert.alert('Cancelled', 'Module was cancelled', [
          {text: 'Cancel', style: 'cancel'},
        ]);
      }
      console.log(response.assets);

      setPhoto(response.assets ? response.assets[0] : undefined);
      setImageModal(false);
    });
  };

  const imagePickerModal = () => {
    return (
      <Portal>
        <Modal
          visible={imageModal}
          onDismiss={() => setImageModal(false)}
          contentContainerStyle={styles.imageModalContainer}>
          <Text style={styles.modalTitle}>Choose an Option</Text>
          <View style={styles.modalButtonsContainer}>
            <Button
              onPress={accessCamera}
              color={Colors.primary}
              style={styles.modalSubtitle}>
              Take a Photo
            </Button>
            <Button
              onPress={accessGallery}
              color={Colors.primary}
              style={styles.modalSubtitle}>
              Choose a photo
            </Button>
          </View>
        </Modal>
      </Portal>
    );
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setImageModal(true)}
        style={styles.imageContainer}>
        {!photo ? (
          <Icon
            style={styles.inputIcon}
            name="add-a-photo"
            color={Colors.backgroundColor}
            size={35}
          />
        ) : (
          <Image
            source={{uri: photo.uri}}
            style={styles.image}
            // resizeMode="contain"
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
      {imagePickerModal()}
    </View>
  );
};

export default ImagePicker;
