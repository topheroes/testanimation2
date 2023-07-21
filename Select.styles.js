import {StyleSheet} from 'react-native';
import {useMemo} from 'react';

const fontMod = a => a;

const useStyles = ({labelIsVisible = true}) => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%',
          overflow: 'hidden',
        },
        input: {
          paddingTop: labelIsVisible ? fontMod(20) : fontMod(8),
          paddingBottom: labelIsVisible ? fontMod(12) : fontMod(8),
          fontFamily: 'ProximaNova-Regular',
          fontSize: fontMod(16),
          color: 'black',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        label: {
          position: 'absolute',
          left: 0,
          fontFamily: 'ProximaNova-Regular',
          color: 'gray',
        },
        iconContainer: {
          marginRight: fontMod(10),
        },
        value: {
          fontFamily: 'ProximaNova-Regular',
          fontSize: fontMod(16),
          color: 'black',
          minHeight: 20,
          width: 400,
        },
        keyboardAppearance: 'light',
      }),
    [labelIsVisible],
  );
};

export default useStyles;
