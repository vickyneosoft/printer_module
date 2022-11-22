import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const HorizontalRular = props => {
  const {style} = props;
  const combinedStyle = useMemo(
    () => StyleSheet.compose(styles.container, style),
    [style],
  );

  return <View style={combinedStyle} />;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.black,
    marginBottom: 5,
    fontSize: 18,
  },
});

export default HorizontalRular;
