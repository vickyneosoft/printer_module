import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
  ToastAndroid,
} from 'react-native';

import SunmiV2Printer from 'react-native-sunmi-v2-printer';
import SunmiPrinter from '@heasy/react-native-sunmi-printer';
import ViewShot, {captureRef} from 'react-native-view-shot';

const App = () => {
  const [status, setStatus] = useState('');

  const viewRef = useRef(null);

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
    try {
      await SunmiV2Printer.printerInit();
      await SunmiV2Printer.setAlignment(1);
      await SunmiV2Printer.setFontSize(24);
      await SunmiV2Printer.printOriginalText('Folio فوليو');
      await SunmiV2Printer.lineWrap(2);
      await SunmiV2Printer.setFontSize(28);
      await SunmiV2Printer.printOriginalText('\nDelivery\n');
      await SunmiV2Printer.lineWrap(2);
      await SunmiV2Printer.setFontSize(48);
      await SunmiV2Printer.setFontWeight(true);
      await SunmiV2Printer.printOriginalText('#01185\n');
      await SunmiV2Printer.setFontWeight(false);
      await SunmiV2Printer.lineWrap(2);
      await SunmiV2Printer.setFontSize(30);
      await SunmiV2Printer.printOriginalText(
        '---------------------------------------\n',
      );
      await SunmiV2Printer.setAlignment(0);
      await SunmiV2Printer.setFontWeight(true);
      await SunmiV2Printer.setFontSize(18);
      await SunmiV2Printer.printOriginalText('DELIVERY NOTES');
      await SunmiV2Printer.setFontWeight(false);
      await SunmiV2Printer.setAlignment(2);
      await SunmiV2Printer.printOriginalText('Rider collects: 09:09\n');
      await SunmiV2Printer.setAlignment(0);
      await SunmiV2Printer.setFontSize(30);
      await SunmiV2Printer.printOriginalText(
        '---------------------------------------\n',
      );
      await SunmiV2Printer.setFontSize(18);
      await SunmiV2Printer.printOriginalText(
        'Submitted: Wed 09 Nov 22, 11:13:06 AM\n',
      );
      await SunmiV2Printer.printOriginalText('Customer: Rimzan H.\n');
      await SunmiV2Printer.setFontSize(30);
      await SunmiV2Printer.printOriginalText(
        '---------------------------------------\n',
      );
      await SunmiV2Printer.setFontWeight(true);
      await SunmiV2Printer.setFontSize(18);
      await SunmiV2Printer.printOriginalText('ORDER NOTES\n');
      await SunmiV2Printer.setFontWeight(false);
      await SunmiV2Printer.setFontSize(16);
      await SunmiV2Printer.printOriginalText('NO CLUTTERY\n');
      await SunmiV2Printer.setFontSize(30);
      await SunmiV2Printer.printOriginalText(
        '---------------------------------------\n',
      );
      await SunmiV2Printer.lineWrap(4);

      // await SunmiV2Printer.setFontSize(18);
      // await SunmiV2Printer.printColumnsText(
      //   ['QTY', 'ITEM', 'AMOUNT'],
      //   [30, 129, 60],
      //   [0, 0, 2],
      // );
      // const data = [
      //   {
      //     id: 0,
      //     qty: 'x1',
      //     item: 'Pasta and Noodles\nالمعكرونة والنودلز',
      //     amount: 'KWD 2.00',
      //   },
      //   {
      //     id: 1,
      //     qty: 'x3',
      //     item: 'Bevarages juices\nSodas with Fries\nعصائر مشروبات\nصودا مع بطاطا مقلية',
      //     amount: 'KWD 6.00',
      //   },
      //   {
      //     id: 2,
      //     qty: 'x3',
      //     item: 'Pasta and Noodles\nالمعكرونة والنودلز',
      //     amount: 'KWD 4.00',
      //   },
      //   {
      //     id: 3,
      //     qty: 'x4',
      //     item: 'Pasta and Noodles\nالمعكرونة والنودلز',
      //     amount: 'KWD 8.00',
      //   },
      // ];
      // await SunmiV2Printer.setFontSize(16);
      // for (let i = 0; i < data.length; i++) {
      //   await SunmiV2Printer.printColumnsText(
      //     [data[i].qty, data[i].item, data[i].amount],
      //     [30, 129, 60],
      //     [0, 0, 2],
      //   );
      // }
      // await SunmiV2Printer.setFontSize(30);
      // await SunmiV2Printer.setAlignment(0);
      // await SunmiV2Printer.printOriginalText(
      //   '\n---------------------------------------\n',
      // );
      // await SunmiV2Printer.printOriginalText(
      //   '---------------------------------------\n',
      // );
      // await SunmiV2Printer.setFontSize(25);
      // await SunmiV2Printer.setAlignment(0);
      // await SunmiV2Printer.printOriginalText('No of Items');
      // await SunmiV2Printer.setAlignment(2);
      // await SunmiV2Printer.printOriginalText('10\n');
      // await SunmiV2Printer.setAlignment(0);
      // await SunmiV2Printer.printOriginalText('Subtotal');
      // await SunmiV2Printer.setAlignment(2);
      // await SunmiV2Printer.printOriginalText('KWD 16.00\n');
      // await SunmiV2Printer.setFontWeight(true);
      // await SunmiV2Printer.setAlignment(0);
      // await SunmiV2Printer.printOriginalText('TOTAL');
      // await SunmiV2Printer.setAlignment(2);
      // await SunmiV2Printer.printOriginalText('KWD 20.00\n');
      // await SunmiV2Printer.setFontWeight(false);
      // await SunmiV2Printer.setFontSize(30);
      // await SunmiV2Printer.printOriginalText('-------------------------\n');
      // await SunmiV2Printer.setFontSize(25);
      // await SunmiV2Printer.setAlignment(0);
      // await SunmiV2Printer.printOriginalText('Credit');
      // await SunmiV2Printer.setAlignment(2);
      // await SunmiV2Printer.printOriginalText('KWD 20.00\n');
      // await SunmiV2Printer.setFontSize(30);
      // await SunmiV2Printer.printOriginalText('-------------------------\n');
      // await SunmiV2Printer.printOriginalText('-------------------------\n');
      // await SunmiV2Printer.lineWrap(3);
      // await SunmiV2Printer.setFontSize(15);
      // await SunmiV2Printer.printOriginalText('Powered by Upayments\n');
      // await SunmiV2Printer.lineWrap(2);
      // await SunmiV2Printer.cutPaper();
    } catch (e) {
      console.log('in error', e);
      ToastAndroid.show(e?.message ?? 'Something went wrong', 2000);
    }
  };

  const printBitmap = async () => {
    try {
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

                    // ToastAndroid.show('printing', 1500);
                    await SunmiV2Printer.printerInit();
                    // ToastAndroid.show('next printing', 1500);

                    await SunmiV2Printer.setAlignment(1);

                    await SunmiV2Printer.printBitmap(
                      logobase64,
                      384 /*width*/,
                      380 /*height*/,
                    );
                  } catch (err) {
                    ToastAndroid.show(err?.message, 500);
                  }
                  // try {
                  //   let logobase64 = this.result.replace(
                  //     'data:image/png;base64,',
                  //     '',
                  //   );

                  //   // console.log(this.result);
                  //   ToastAndroid.show(
                  //     logobase64?.length ?? 'base64 len N/A',
                  //     500,
                  //   );

                  //   // ToastAndroid.show('printing', 1500);
                  //   // await SunmiV2Printer.printerInit();
                  //   // // ToastAndroid.show('next printing', 1500);

                  //   // await SunmiV2Printer.setAlignment(1);

                  //   // await SunmiV2Printer.printBitmap(
                  //   //   logobase64,
                  //   //   384 /*width*/,
                  //   //   380 /*height*/,
                  //   // );

                  //   // console.log(SunmiPrinter);

                  //   // SunmiPrinter.printerInit();
                  //   // SunmiPrinter.printBitmap(logobase64, 384);
                  // } catch (err) {
                  //   ToastAndroid.show(
                  //     err?.message ?? 'inside print command',
                  //     1500,
                  //   );
                  // }
                }; // <--- `this.result` contains a base64 data URI
                reader.readAsDataURL(blob);
              });
          } catch (err) {
            ToastAndroid.show(err?.message, 500);
          }
        },
        error => {
          console.log('in error', error);
          // throw new Error(typeof error === String ? error : 'Internal error');
        },
      );
    } catch (e) {
      console.log('in error', e);
      ToastAndroid.show(e?.message ?? 'Something went wrong', 2000);
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot
        ref={viewRef}
        style={{
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            marginVertical: 10,
            fontSize: 20,
          }}>
          {'Folio فوليو'}
        </Text>
        <View
          style={{
            backgroundColor: 'black',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              paddingVertical: 10,
              fontSize: 24,
            }}>
            {'Delivery'}
          </Text>
        </View>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 10,
            fontSize: 38,
          }}>
          {'#01185'}
        </Text>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            marginBottom: 5,
            fontSize: 24,
            letterSpacing: 2,
          }}>
          {'-------------------------------------'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: -10,
            paddingHorizontal: 2,
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              marginBottom: 5,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {'DELIVERY NOTES'}
          </Text>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              marginBottom: 5,
              fontSize: 15,
            }}>
            {'Rider collects:09:09'}
          </Text>
        </View>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 24,
            letterSpacing: 2,
            marginTop: -12,
          }}>
          {'-------------------------------------'}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            marginTop: -5,
          }}>
          {'Submitted: Wed 09 Nov 22, 11:13:06 AM\nCustomer: Rimzaan H.'}
        </Text>
      </ViewShot>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{'Printing the above UI'}</Text>
        <Text>{`Printer Status: ${status}`}</Text>
        {/* <TouchableOpacity style={styles.button} onPress={print}>
          <Text style={styles.buttonText}>Print</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={printBitmap}>
          <Text style={styles.buttonText}>Print Bitmap</Text>
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
