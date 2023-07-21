/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Text} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import BottomSheetComponent from './BottomSheetComponent';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Text>200</Text>
      <BottomSheetComponent />
    </GestureHandlerRootView>
  );
}

export default App;
