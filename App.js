import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
  ToastAndroid,
  NativeModules,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import ViewShot from 'react-native-view-shot';
import HorizontalRular from './components/HorizontalRular';
import RegularText from './components/RegularText';
import SemiBoldText from './components/SemiBoldText';
import BoldText from './components/BoldText';
import dummyData from './data/dummyData';
import ReceiptItem from './components/ReceiptItem';
import colors from './constants/colors';

const {PrintModule} = NativeModules;

const timer = milli => {
  return new Promise(res => {
    setTimeout(() => {
      res(true);
    }, milli);
  });
};

const App = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const viewRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    var listener = null;

    try {
      listener = DeviceEventEmitter.addListener('PrinterStatus', action => {
        console.log('printer status : ', action);
        switch (action) {
          case SunmiV2Printer.Constants.NORMAL_ACTION:
            setStatus(() => 'printer normal');
            break;
          case SunmiV2Printer.Constants.OUT_OF_PAPER_ACTION:
            setStatus(() => 'printer out out page');
            break;
          case SunmiV2Printer.Constants.COVER_OPEN_ACTION:
            setStatus(() => 'printer cover open');
            break;
          default:
            setStatus(() => 'printer status:' + action);
        }
      });
    } catch (e) {
      console.log(e);
    }

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, []);

  const print = async () => {
    // try {
    //   await SunmiV2Printer.printerInit();
    //   await SunmiV2Printer.setAlignment(1);
    //   await SunmiV2Printer.setFontSize(24);
    //   await SunmiV2Printer.printOriginalText('Folio فوليو');
    //   // await printTextWithFont("text", "style", size)
    //   await SunmiV2Printer.lineWrap(2);
    //   await SunmiV2Printer.setFontSize(28);
    //   await SunmiV2Printer.printOriginalText('\nDelivery\n');
    //   await SunmiV2Printer.lineWrap(2);
    //   await SunmiV2Printer.setFontSize(48);
    //   await SunmiV2Printer.setFontWeight(true);
    //   await SunmiV2Printer.printOriginalText('#01185\n');
    //   await SunmiV2Printer.setFontWeight(false);
    //   await SunmiV2Printer.lineWrap(2);
    //   await SunmiV2Printer.setFontSize(30);
    //   await SunmiV2Printer.printOriginalText(
    //     '---------------------------------------\n',
    //   );
    //   await SunmiV2Printer.setAlignment(0);
    //   await SunmiV2Printer.setFontWeight(true);
    //   await SunmiV2Printer.setFontSize(18);
    //   await SunmiV2Printer.printOriginalText('DELIVERY NOTES');
    //   await SunmiV2Printer.setFontWeight(false);
    //   await SunmiV2Printer.setAlignment(2);
    //   await SunmiV2Printer.printOriginalText('Rider collects: 09:09\n');
    //   await SunmiV2Printer.setAlignment(0);
    //   await SunmiV2Printer.setFontSize(30);
    //   await SunmiV2Printer.printOriginalText(
    //     '---------------------------------------\n',
    //   );
    //   await SunmiV2Printer.setFontSize(18);
    //   await SunmiV2Printer.printOriginalText(
    //     'Submitted: Wed 09 Nov 22, 11:13:06 AM\n',
    //   );
    //   await SunmiV2Printer.printOriginalText('Customer: Rimzan H.\n');
    //   await SunmiV2Printer.setFontSize(30);
    //   await SunmiV2Printer.printOriginalText(
    //     '---------------------------------------\n',
    //   );
    //   await SunmiV2Printer.setFontWeight(true);
    //   await SunmiV2Printer.setFontSize(18);
    //   await SunmiV2Printer.printOriginalText('ORDER NOTES\n');
    //   await SunmiV2Printer.setFontWeight(false);
    //   await SunmiV2Printer.setFontSize(16);
    //   await SunmiV2Printer.printOriginalText('NO CLUTTERY\n');
    //   await SunmiV2Printer.setFontSize(30);
    //   await SunmiV2Printer.printOriginalText(
    //     '---------------------------------------\n',
    //   );
    //   await SunmiV2Printer.lineWrap(4);
    //   // await SunmiV2Printer.setFontSize(18);
    //   // await SunmiV2Printer.printColumnsText(
    //   //   ['QTY', 'ITEM', 'AMOUNT'],
    //   //   [30, 129, 60],
    //   //   [0, 0, 2],
    //   // );
    //   // const data = [
    //   //   {
    //   //     id: 0,
    //   //     qty: 'x1',
    //   //     item: 'Pasta and Noodles\nالمعكرونة والنودلز',
    //   //     amount: 'KWD 2.00',
    //   //   },
    //   //   {
    //   //     id: 1,
    //   //     qty: 'x3',
    //   //     item: 'Bevarages juices\nSodas with Fries\nعصائر مشروبات\nصودا مع بطاطا مقلية',
    //   //     amount: 'KWD 6.00',
    //   //   },
    //   //   {
    //   //     id: 2,
    //   //     qty: 'x3',
    //   //     item: 'Pasta and Noodles\nالمعكرونة والنودلز',
    //   //     amount: 'KWD 4.00',
    //   //   },
    //   //   {
    //   //     id: 3,
    //   //     qty: 'x4',
    //   //     item: 'Pasta and Noodles\nالمعكرونة والنودلز',
    //   //     amount: 'KWD 8.00',
    //   //   },
    //   // ];
    //   // await SunmiV2Printer.setFontSize(16);
    //   // for (let i = 0; i < data.length; i++) {
    //   //   await SunmiV2Printer.printColumnsText(
    //   //     [data[i].qty, data[i].item, data[i].amount],
    //   //     [30, 129, 60],
    //   //     [0, 0, 2],
    //   //   );
    //   // }
    //   // await SunmiV2Printer.setFontSize(30);
    //   // await SunmiV2Printer.setAlignment(0);
    //   // await SunmiV2Printer.printOriginalText(
    //   //   '\n---------------------------------------\n',
    //   // );
    //   // await SunmiV2Printer.printOriginalText(
    //   //   '---------------------------------------\n',
    //   // );
    //   // await SunmiV2Printer.setFontSize(25);
    //   // await SunmiV2Printer.setAlignment(0);
    //   // await SunmiV2Printer.printOriginalText('No of Items');
    //   // await SunmiV2Printer.setAlignment(2);
    //   // await SunmiV2Printer.printOriginalText('10\n');
    //   // await SunmiV2Printer.setAlignment(0);
    //   // await SunmiV2Printer.printOriginalText('Subtotal');
    //   // await SunmiV2Printer.setAlignment(2);
    //   // await SunmiV2Printer.printOriginalText('KWD 16.00\n');
    //   // await SunmiV2Printer.setFontWeight(true);
    //   // await SunmiV2Printer.setAlignment(0);
    //   // await SunmiV2Printer.printOriginalText('TOTAL');
    //   // await SunmiV2Printer.setAlignment(2);
    //   // await SunmiV2Printer.printOriginalText('KWD 20.00\n');
    //   // await SunmiV2Printer.setFontWeight(false);
    //   // await SunmiV2Printer.setFontSize(30);
    //   // await SunmiV2Printer.printOriginalText('-------------------------\n');
    //   // await SunmiV2Printer.setFontSize(25);
    //   // await SunmiV2Printer.setAlignment(0);
    //   // await SunmiV2Printer.printOriginalText('Credit');
    //   // await SunmiV2Printer.setAlignment(2);
    //   // await SunmiV2Printer.printOriginalText('KWD 20.00\n');
    //   // await SunmiV2Printer.setFontSize(30);
    //   // await SunmiV2Printer.printOriginalText('-------------------------\n');
    //   // await SunmiV2Printer.printOriginalText('-------------------------\n');
    //   // await SunmiV2Printer.lineWrap(3);
    //   // await SunmiV2Printer.setFontSize(15);
    //   // await SunmiV2Printer.printOriginalText('Powered by Upayments\n');
    //   // await SunmiV2Printer.lineWrap(2);
    //   // await SunmiV2Printer.cutPaper();
    // } catch (e) {
    //   console.log('in error', e);
    //   ToastAndroid.show(e?.message ?? 'Something went wrong', 2000);
    // }
  };

  const printBitmap = async () => {
    try {
      // try {
      //   //ensure the base64 string without URI Scheme
      //   let logobase64 = logo.replace('data:image/png;base64,', '');
      //   console.log(PrintModule);

      //   await PrintModule.printBitmap(logobase64);
      //   ToastAndroid.show('success', 1500);

      //   // await SunmiV2Printer.printerInit();

      //   // await SunmiV2Printer.setAlignment(0);

      //   // // await SunmiV2Printer.enterPrinterBuffer(true);

      //   // //图片bitmap对象(最大宽度384像素，超过无法打印并且回调callback异常函数)
      //   // await SunmiV2Printer.printBitmap(
      //   //   logobase64,
      //   //   384 /*width*/,
      //   //   400 /*height*/,
      //   // );

      //   // await SunmiV2Printer.enterPrinterBuffer(true);
      //   // await SunmiV2Printer.commitPrinterBuffer(true);
      //   // await SunmiV2Printer.exitPrinterBuffer(false)

      //   // await SunmiV2Printer.exitPrinterBuffer(true);
      // } catch (err) {
      //   console.log(err?.message);
      //   ToastAndroid.show('In catch : ' + err?.message ?? 'in catch', 1500);
      // }
      // setLoading(true);
      // await timer(500);
      // setLoading(false);
      // await timer(500);
      // // scrollViewRef.current.scrollToEnd({animated: true});
      // // await timer(500);

      viewRef.current.capture().then(
        async uri => {
          console.log(uri);
          try {
            fetch(uri)
              .then(response => response.blob())
              .then(blob => {
                var reader = new FileReader();
                reader.onload = async function () {
                  try {
                    let logobase64 = this.result.replace(
                      'data:image/png;base64,',
                      '',
                    );

                    // console.log(logobase64);

                    await PrintModule.printBitmap(logobase64);
                    ToastAndroid.show('success', 1500);
                  } catch (err) {
                    ToastAndroid.show(err?.message, 500);
                  }
                }; // <--- `this.result` contains a base64 data URI
                reader.readAsDataURL(blob);
              });
          } catch (err) {
            ToastAndroid.show(err?.message, 500);
          }
        },
        error => {
          console.log('in error', error);
          ToastAndroid.show(error?.message ?? 'Something went wrong', 500);
          // throw new Error(typeof error === String ? error : 'Internal error');
        },
      );
    } catch (e) {
      console.log('in error', e);
      ToastAndroid.show(e?.message ?? 'Something went wrong', 2000);
    }
  };

  const renderOrderItem = (obj, index) => {
    const {id, qty, item, amount} = obj;
    return (
      <ReceiptItem key={id} qtyTitle={qty} itemTitle={item} amtTitle={amount} />
    );
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewRef} style={styles.receiptContainer}>
        {loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={colors.black} />
          </View>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            style={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <RegularText
              style={{
                textAlign: 'center',
                marginVertical: 10,
                fontSize: 24,
              }}>
              {'Folio فوليو'}
            </RegularText>
            <View
              style={{
                backgroundColor: 'black',
              }}>
              <SemiBoldText
                style={{
                  color: 'white',
                  textAlign: 'center',
                  paddingVertical: 10,
                  fontSize: 28,
                }}>
                {'Delivery'}
              </SemiBoldText>
            </View>
            <SemiBoldText
              style={{
                color: 'black',
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 10,
                fontSize: 48,
              }}>
              {'#01185'}
            </SemiBoldText>
            <HorizontalRular />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 2,
                marginVertical: 5,
              }}>
              <BoldText
                style={{
                  color: 'black',
                  textAlign: 'center',
                  marginBottom: 5,
                  fontWeight: 'bold',
                }}>
                {'DELIVERY NOTES'}
              </BoldText>
              <RegularText
                style={{
                  textAlign: 'center',
                  marginBottom: 5,
                }}>
                {'Rider collects:09:09'}
              </RegularText>
            </View>
            <HorizontalRular />
            <RegularText
              style={{
                marginTop: 5,
              }}>
              {'Submitted: Wed 09 Nov 22, 11:13:06 AM'}
            </RegularText>
            <RegularText
              style={{
                paddingBottom: 10,
              }}>
              {'Customer: Rimzan H.'}
            </RegularText>
            <HorizontalRular />
            <BoldText
              style={{
                marginVertical: 5,
                fontSize: 18,
              }}>
              {'ORDER NOTES'}
            </BoldText>
            <RegularText
              style={{
                paddingBottom: 15,
                fontSize: 16,
              }}>
              {'NO CLUTTERY'}
            </RegularText>
            <HorizontalRular />
            <ReceiptItem
              qtyTitle={'QTY'}
              itemTitle={'ITEM'}
              amtTitle={'AMOUNT'}
              isColumnText={true}
              style={{
                marginBottom: 10,
              }}
            />
            {dummyData.map(renderOrderItem)}
            <HorizontalRular />
            <HorizontalRular />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <RegularText>{'No of Items'}</RegularText>
              <RegularText>{'10'}</RegularText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <RegularText>{'Subtotal'}</RegularText>
              <RegularText>{'KWD 16.00'}</RegularText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <BoldText>{'TOTAL'}</BoldText>
              <BoldText>{'KWD 20.00'}</BoldText>
            </View>
          </ScrollView>
        )}
      </ViewShot>
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
          borderWidth: 2,
          margin: 10,
        }}>
        <TouchableOpacity
          style={{
            marginVertical: 10,
          }}
          onPress={printBitmap}>
          <BoldText>{'Print'}</BoldText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  receiptContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 50,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'steelblue',
  },
  buttonText: {
    color: 'white',
  },
});

export default App;
