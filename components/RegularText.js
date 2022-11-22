import React, {useMemo} from 'react';
import {Text, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const RegularText = props => {
  const {style, children} = props;

  const combinedStyle = useMemo(
    () => StyleSheet.compose(styles.default, style),
    [style],
  );

  return <Text style={combinedStyle}>{children}</Text>;
};

const styles = StyleSheet.create({
  default: {
    fontSize: 18,
    color: colors.black,
    fontFamily: 'AdobeCleanRegular',
  },
});

export default RegularText;
