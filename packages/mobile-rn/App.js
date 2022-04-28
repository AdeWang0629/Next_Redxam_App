import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import Orientation from 'react-native-orientation-locker';

import Router from './src/redxam/navigations/Router';
import styles from './src/styles/AppStyle';
import store from './src/redux/store';
import {ThemeProvider} from 'react-native-elements';
import {thememode} from './src/utils/Variables';
const theme = {
  Avatar: {
    rounded: true,
  },
  Badge: {
    textStyle: {fontSize: 30},
  },
};
//Orientation.lockToLandscape();
Orientation.lockToPortrait();
const App = () => {
  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <ThemeProvider useDark={thememode === 'light'}>
          <Provider store={store}>
            <Router />
          </Provider>
        </ThemeProvider>
      </SafeAreaView>
    </>
  );
};
export default App;
