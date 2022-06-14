module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  //   transform: {
  //     '^.+\\.jsx$': 'babel-jest',
  //   },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    // eslint-disable-next-line max-len
    'node_modules/(?!(@react-native|react-native|@react-native-firebase/messaging|redux-persist|@react-native-firebase/database|@react-native-firebase/storage|@react-native-async-storage/async-storage|@react-native-firebase/app|react-native-iphone-x-helper|@react-navigation/bottom-tabs|react-native-image-crop-picker|react-native-background-timer|@react-navigation/stack|@react-navigation/native|@react-native-community/netinfo|@react-native-device-info|react-native-error-boundary|rn-fetch-blob|react-native-version-number|@development-team20/react-native-ui-library|react-native-maps|react-native-geolocation-service|react-native-version-check|@development-team20/app-utils|react-native-gesture-handler|react-native-redash|react-native-reanimated|react-native-vector-icons|react-native-progress|react-native-linear-gradient|react-native-skeleton-content-nonexpo|react-native-countup|react-native-code-push|react-native-dropdown-picker|@react-native-community|react-native-image-viewing|react-native-image-picker|@react-native-firebase/auth|react-native-vector-icons)/)',
  ],
};
