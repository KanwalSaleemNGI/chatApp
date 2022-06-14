module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        safe: true,
        allowUndefined: false,
      },
    ],
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        // root: ['./src'],
        // alias: {
        //   '@constants': './src/constants',
        //   '@context': './src/context',
        //   '@store': './src/state',
        //   '@types': './src/types',
        //   '@services': './src/services/index.ts',
        //   '@screens': './src/screens',
        //   '@assets': './src/assets',
        //   '@components': './src/components/index.ts',
        //   '@i18n': './src/i18n/index.ts',
        //   '@envconfig': './config/env/index.js',
        //   '@utils': './src/utils',
        //   '@android': './android/app/src',
        // },
        // cwd: 'babelrc',
      },
    ],
  ],
};
