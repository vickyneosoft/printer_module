import React, {useMemo} from 'react';
import {View} from 'react-native';

import BoldText from './BoldText';
import SemiBoldText from './SemiBoldText';
import RegularText from './RegularText';

const ReceiptItem = props => {
  const {qtyTitle, itemTitle, amtTitle, isColumnText, style} = props;

  const QtyComp = useMemo(
    () => (isColumnText ? BoldText : RegularText),
    [isColumnText],
  );
  const TextComp = useMemo(
    () => (isColumnText ? BoldText : SemiBoldText),
    [isColumnText],
  );

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 5,
        ...style
      }}>
      <QtyComp style={{flex: 0.3}}>{qtyTitle}</QtyComp>
      <TextComp style={{flex: 2, marginLeft: 15, textAlign: 'left'}}>{itemTitle}</TextComp>
      <TextComp style={{flex: 0.6}}>{amtTitle}</TextComp>
    </View>
  );
};

export default ReceiptItem;
