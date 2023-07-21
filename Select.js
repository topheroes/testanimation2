import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, TouchableOpacity, Text} from 'react-native';

import useStyles from './Select.styles';

const fontMod = a => a;

const Select = ({
  label,
  labelStyle,
  labelProps,
  value,
  children,
  defaultHeight = 50,
}) => {
  const [labelIsInside, setLabelIsInside] = useState(value ? false : true);
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState(defaultHeight);

  const labelIsInsideAnimated = useRef(
    new Animated.Value(!value ? 1 : 0),
  ).current;
  const heightAnimated = useRef(new Animated.Value(0)).current;

  const styles = useStyles({labelIsVisible: !!label});

  const handleSetMaxHeight = ({nativeEvent}) => {
    setMaxHeight(nativeEvent.layout.height + defaultHeight);
  };

  const startAnimation = () => {
    setLabelIsInside(prev => {
      if (value) {
        return false;
      }

      return !prev;
    });
    setExpanded(prev => !prev);
  };

  useEffect(() => {
    Animated.timing(labelIsInsideAnimated, {
      toValue: labelIsInside ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(heightAnimated, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [labelIsInside, expanded, heightAnimated, labelIsInsideAnimated]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: heightAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [defaultHeight, maxHeight],
          }),
        },
      ]}>
      <TouchableOpacity style={styles.input} onPress={startAnimation}>
        <Text numberOfLines={expanded ? 0 : 1} style={styles.value}>
          {value}
        </Text>
        <View style={styles.iconContainer}>
          {expanded ? <Text>&lt;</Text> : <Text>&gt;</Text>}
        </View>
        <Animated.Text
          style={[
            styles.label,
            labelStyle,
            {
              top: labelIsInsideAnimated.interpolate({
                inputRange: [0, 1],
                outputRange: [0, fontMod(20)],
              }),
              fontSize: labelIsInsideAnimated.interpolate({
                inputRange: [0, 1],
                outputRange: [fontMod(12), fontMod(16)],
              }),
            },
          ]}
          ellipsizeMode="tail"
          numberOfLines={1}
          {...labelProps}>
          {label}
        </Animated.Text>
      </TouchableOpacity>
      <View onLayout={handleSetMaxHeight}>{children}</View>
    </Animated.View>
  );
};

export default React.memo(Select);
