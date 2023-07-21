import React, {useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import Select from './Select';

const AnimatedView = Animated.createAnimatedComponent(View);

const Expandable = () => {
  const isOpened = useSharedValue(false);

  const handleExpand = useCallback(() => {
    isOpened.value = !isOpened.value;
  }, [isOpened]);

  const blockHeightStyle = useAnimatedStyle(() => {
    const height = interpolate(
      +isOpened.value,
      [0, 1],
      [30, 260],
      Extrapolate.CLAMP,
    );

    return {
      height,
    };
  }, [isOpened]);

  const rand = () => Math.floor(Math.random() * 255) + 1;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: `rgba(${rand()},${rand()},${rand()},1)`,
      width: '100%',

      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'gray',
      width: 100,
      height: 30,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    txt: {
      color: 'white',
    },
  });

  return (
    <AnimatedView style={[styles.container, blockHeightStyle]}>
      <TouchableOpacity onPress={handleExpand} style={styles.button}>
        <Text style={styles.txt}>{'toggle'}</Text>
      </TouchableOpacity>
    </AnimatedView>
  );
};

const BottomSheetComponent = () => {
  // ref
  const bottomSheetRef = useRef(null);

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const snapPoints = useSharedValue([300]);

  const onLayout = useCallback(
    props => {
      snapPoints.value = [props?.nativeEvent?.layout?.height];
      console.log(animatedContentHeight.value);
      handleContentLayout(props);
    },
    [handleContentLayout, snapPoints, animatedContentHeight],
  );

  const {height} = Dimensions.get('window');

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      contentHeight={animatedContentHeight}
      animateOnMount={false}>
      <BottomSheetScrollView
        onLayout={onLayout}
        style={{
          flex: 1,
          borderColor: 'red',
          borderWidth: 1,
          maxHeight: height * 0.9,
        }}>
        <BottomSheetView style={styles.container}>
          <Select label="label" value="Press me to toggle">
            <Text>1</Text>
            <Text>1</Text>
            <Text>1</Text>
          </Select>
          <Expandable />
          <Expandable />
          <Expandable />
        </BottomSheetView>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'red',
  },
});

export default BottomSheetComponent;
