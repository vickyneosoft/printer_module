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
      let logo =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABDgAAAMBCAYAAAAKwgRkAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAACAASURBVHic7N15mFxVnTfwbzCBELKwDouQQVZFVmUVjAReFEFZdBRBxoVRB5cwOjMuo6POuOvoOMD4usErjGwuCIiya5QgoKLAIEggsgcEZA2EkCD1/nE7ppOu7qpbfauqq/rzeZ7z0H3rLL/T1R36/vrccxIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAfjK12wEAAAAAjMYLk1zV7SAAAAAAWvXKJI8nqSVZo8uxNGPvJDt3OwgAAAB627Ypbi4HlzW7GhGjcXiSpSmSG7Uka3c3nIZ2TvJAknuTvKjLsQAAANDDzs+Km+HlZauuRsRofCorv5ebdDecEW2X5O6siPWPSXbrakQAUNLEbgcAACNYM8labex/WZLH2th/J0xIcmCSnZI8nCJJcl9XI2K5hat83s7v5dF4fpIfJdl00LUNk1yY5IAk13YjKAAAgH7ypgxd0VBlOaNzU2lKKys4PrZK/TsztlcKjCeHZeX3ZqzubfGR1P/5uDHJBl2MCwBKWa3bAQAALZua5F9XuTYzyRFdiIWh/rjK52N1BcdnB8pgjyU5OsmDnQ8HAFojwQEAvWtakkl1rq/b6UCo6/5VPp/alSgaezbFKo73DXy+OMXqE4+mANBT7MEBAL3rj0kuTzJrleuXdyEWhlp19cNYTXAkxSMp/5XktiRPJ/lZd8MBgPIkOADoNacn+UBFfS2tqJ9uqSV5a4rHCw5IsanlfyW5tJtB8RdPJLkrxWNDSbHiZqz7YbcDAIBWSXAA0GueTHJvt4MYQ25LsefGhBQJD8aWBemtBAcA9CwJDgDoD5IbY9Ndgz6e0bUoRjYxySFJXpdk6yQPJLkyyTkpTlIBgJ4gwQEA0D4LB328dteiGN7UJF9NcWLKYK9M8skkn0/y70me6nBcAFCaU1QAANpn8FGxYy3BMSHJlzI0uTHYB5OcmWRKRyICgFGwggMAmrdGku2SbJVkoyRrJlmW5KEkdya5IcnDHY5pzSTPWeXa4hRHf7ZiLM6xlw1OcIy143tfm+QdTdQ7NMmXkxwbj0IBAAC05E0pbqgGl693IY4tknw6xc3qqvGsWs5KcaLJhBbGOb9Of1u1oU09nZrjeDMrK75uP+9yLIOtmWJ/jeWx3Z7ku0nmZvj3/fCuRAoAANAHup3gWCPFkbRL68TRqJybZPOS43UjwdHpOY43L8iKr9dY2rDzkKyI619TfB8st2mS/87Q9/uGFIkRAAAASupmgmNGkrPrjF+m3J1kjxJjdjrB0Y05tsuGKY7LfU+Km/excmLJhlnxtari0Z6q5nnKQExfS/2VOBNSJL5Wfb9f3+J4AAAA41q3EhxrpDgic7ib+u8k+WiSv09xE/jfGf7Rjj8l2bHJcTuZ4OjWHKu2WpJ3Jnl0lZjuzdi4GV89K8e1xsjVh1XlPJ+T4ijYWpItR6g3ISsSIcvLRSXHAgAAIN1LcHywzri1JP+VZONh2qyZ4jSKh+u0+3WK4zgb6WSCo1tzrNJzUpwCMtIKk/d1OKZ6bs+KeNZpoX3V83zeQJurm6i7SYa+3x5LAgAAKKkbCY7d6oxZS/K2Jttvm+SeOu0/30TbTiU4ujnHKr2vTgz1Src3x/zpoFg2aaF91fPcdaD+mU3W/9gq44x0rCwAAAB1dCPB8cM6Y36hZB+DT85od7KilTbdnGNVdhxm/Hrl3gy/KqUTTkvrX592zPNlA/XnNhnDlquM89/Nhw8AnTOx2wEAQEnbJTl2lH38T5LFda7vkuTVq1y7L8nnSvZ/eYrNG1eN85gkHy7ZV9X6ZY4fH/TxhSkSNH9IsULizSn2q1hu4yTHJfmXDsRVz32DPi57Ckk75vn0wH/3TfH9cG2D+k8kmZ9i5U6S7NMwagAAAFZSbwVHFWX9Ycb7fJ26720x9m3r9PV4krVGaNOJFRzdnmMVdho03hdT/w82b8jKR98+ldYeD6nC+wfFsVuJdu2a53MH1b8zyVtT7MsxOcVmplNTHG/7+iQnD/S56vvsuFgAAIASOp3guKFO3ZFOmWjk4jr97TVC/U4kOLo9xyr828A452fk1ajvWCWud1U0/tuSzEtyYpP13zoohjKrH9o5z7kZ+r6VKTYaBQAAKKGTCY7N6tT71Sjjf3edPkdaLdHuBMdYmGMVlidpdmpQb0KKjTSXx3VlBWPvNai/jzbZ5tBBbf5PibHaOc+DMvR9G648kGKlyJODru1QYh4A0BH24ACg18xP8otR9rGszrV6SYHRjnNjnWvb1rnWKf0wx02SbJ/kqiTXN6hbS/KRJK9NMilFcmLzJHe0OPZqWXlPjDOabPfIoI8nNdmm3fO8IMmnB9qN5Osp9me5I8XKlf0Hrk9u0A4AOk6CA4Be8/Mkf9+Gfteuc+22UfZ5d51rG42yz9HohznOHPjvTU3Wvy3FZqhzBj5/cVpPcByU5BUDH/+/FJt9NuPRQR83m+DoxDw/muR3Sf4pxdGxSZH8uyLJj5P8KEVCcbnrsiLB8XQAYIxZrdsBAMAYUe/m//FR9vlEnWvPHWWfo9EPc5wx8N8y+4acMujjnVscd80Ue2Is97USbVtZwdGJedaSnJVk9yTrJdkwyZQk+yX5UlZObiTJ7wf+uzjJ7SXiAoCOkOAAgMKUOteWjLLPeu2njrLP0einOe6b5KVN1r0uK27Wt25xvL9PsSoiSc5N8usSbR8b9PHSkuN2Yp61JA+n2GvjmWHqbJLipJUk+UGSRSX6B4COkOAAgMKTda6Ndp+Beu0fHmWfo9EPc3xo0MdnJzkijVdFPJvknIGPWzkxZs8kn10lhuFO4qlnUYpVD0myoMk23ZjnqtZPckiKvUYWZsV+Hd+uoG8AqJw9OACg8Gida9NH2We9lQwPjLLP0eiHOd6cYkXEjCQbpHjE4vcpbrqvSLFnxUN12i3fqHO9JseZmGJT1lem2KticCLn75K8KsVjHOdk+KTFjBSrL96WYvXMDQPxN6NT8xwc66YpVn7smuIxlXrH/V6T5Kcl+waAjpDgAIBCvZv/LUbZ56Z1rj04yj5Hox/m+ESS/87Kp3+8IMlnBn3+hxQrDh5NsXpiUVbsP7Jhko8NfLxBihv725OskSJZs26K43R3SjJthDg2TPKFgbL8ZJ/nJFkrRYJn+xR7WwxOjHwjxeMgnZ7n+gPX7xyIcc2Buc1IsV/KFgP1G3koyYcz/GMsAAAADONNKW4IB5evt2msTeuM9atR9vnuOn2+Z4T659epX+9o11bbjIU5VmFGkrl1xm13+c8kt7bY9uE0l0QYC/NctTyZIrHSzROAAAAAelonExxJsUnjquONZi+Di+r0t+cI9dud4Ei6P8eqzEjyuRSbdnbiJv+EFHuX/VWS/2mh/Qd7ZJ6Dy9UpElhlEzMAAACsotMJjs/UGe+9Lfa1TZ2+Hk7xCMNwOpHg6PYcq7ZZij0x/ifFoyZV3dzflOIo2Ddlxekhg+2a5KQUx+yO1M/jST6R0W/m2q55Di7/OzDntyTZNsmEUcYMAB1lDw4AWOHMJP+yyrUPpLipLHsyyPvqXDsx9U8y6aR+m+PdSU4eKEmyTooVB+um2HdiapIds2Ivi68nuWvg4w1SbP55bYo9Lx4deO3OrHy0az3XpNg8dE6SnZNsPjDOxgP9PZTkjhRJg8dHMb/lRjPP9VNsJntziv0zlmTFnh0PJ7l/oFQRJwAAAHV0egVHUhzJueqYX0q5v2bvW6ePWhpv6NmJFRxJd+fYDV9PEdujGf2pMWPZeJknAABAz+lGgmOnJE/VGffdaS4BsH2Se+u0/2QTbTuV4OjmHDttv6yI7ytdjqWdxss8AQAAelI3EhxJ8g91xq0l+WaG35BzepK3p/6eDFeleBSikU4lOJLuzbGTnpvktqyIcb8K+94+Y+dUkXbOEwAAgAp0K8ExKckZdcZeXi5J8h8p9q74RJJTUzwWUK/uvUm2a3LcTiY4ujXHTtkoxRG4y2P8YZp/BGdCkmNT7HNRzxZJFqQ4ZWTj0YU5aqOZJwAAAB3SrQRHUpwE0spxoIPLbUleVGLMTiY4ku7MsRNekmJDzcFx7lKi/T8OtPlJik08B3tuVj5q99cD17phtPMEAACgQ7qZ4EiK08belcZHgdYrZybZtOR4nU5wJJ2fY1k7JtknyZoN6j0nye5JvpGhcX6hxHhvX6Xt3BSnkCTJJikSGqv2f12GX+3RrE7PEwD6jmNiAWB4zyT5v0nOSfK3SY5Jsu0I9RenuOk/JckVbY+uGmN9jp9MckiSZQPj3ZzikZjFKWKfnuR5SV6W+nuH/DTJvzU51jEpEgeD7Zvi6NsjU6zU2LpOuyuSPNLkGMPp5DwBoC95RhMAmjchxc3l1kn+KsWmms8keTjJXUluSvJk16Krxlia48QUyYVjW2x/VZLDkjzQZP0DUuxhMXnQtcUpkgrXDHz+kiTnJtlg4PMLkrxuoF6rOj1PAAAAoAtemSLBUObxmdPS2mMjs1Mkc5b389o6dbZPcmOSy1ocYzidnCcAAADQBauneITjvIx8w39tktdkdKtUd0rxiMhbR6izYdqTWOjkPAGgr/ifIgDQa/46yd5Jdk6RaHgiK45t/XWKR2pGa+pAv93UiXkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj04RuB9BmtW4HAAAAAGNI3+YBVut2AAAAAACjJcEBAAAA9DwJDgAAAKDnSXAAAAAAPU+CAwAAAOh5EhwAAABAz5PgAAAAAHqeBAcAAADQ8yQ4AAAAgJ4nwQEAAAD0PAkOAAAAoOdJcAAAAAA9T4IDAAAA6HkSHAAAAEDPk+AAAAAAep4EBwAAANDzJDgAAACAnifBAQAAAPQ8CQ4AAACg50lwAAAAAD1PggMAAADoeRIcAAAAQM+T4AAAAAB6ngQHAAAA0PMkOAAAAICeJ8EBAAAA9DwJDgAAAKDnSXAAAAAAPU+CAwAAAOh5EhwAAABAz5PgAAAAAHqeBAcAAADQ8yQ4AAAAgJ4nwQEAAAD0PAkOAAAAoOdJcAAAAAA9T4IDAAAA6HkSHAAAAEDPk+AAAAAAep4EBwAAANDzJDgAAACAnifBAQAAAPQ8CQ4AAACg50lwAAAAAD1PggMAAADoeRIcAAAAQM+b2O0AAID2+9rXvpbnPOc5Q67PmTMnS5Ys6UJEAADVmtDtANqs1u0AAGAsWLp0aSZNmjTk+vTp07No0aIuRAQAdEnf5gGs4AAAmnLEEUdkn332yRprrJHf/va3+drXvtbtkAAA/kKCA4CectJJJ+V1r3tdqTa1Wi3Lli3LU089lUceeSQLFy7MggULctVVV+Wiiy7KI4880qZo+8c3v/nNvO1tb1vp2hFHHJHZs2d3KSIAgPGlpiiKovRXOeOMM2pVeuKJJ2oXXnhh7Y1vfGPX59bOsnTp0rrznzZtWsO2s2bNqv35z3+u2/6f//mfuz43RVEURVFKlb7lFBUAxrW11lorBx54YE477bTceOONOeqoo7od0pizzz77ZLXV6v/KsMcee3Q4GgCA+iQ4AGDAdtttl9NOOy0//vGPs+mmm3Y7nDFj8eLFLb0GANBJEhwAMMiECRNy0EEH5corr8z+++/f7XDGhAsuuCCPP/74kOvPPvtszjnnnC5EBAAwlE1GAegL11xzTT760Y8O+/qUKVOy9tprZ+bMmXnhC1+YF73oRdliiy2Grb/ZZpvl7LPPzpvf/Oacd9557Qi5Z9xyyy057rjj8sUvfjHrr79+kmLlxmc/+9mce+65XY4OAKDQt+ffDujrDVQAxqMzzjgjRx555JDrP//5z7PvvvuW6mv27NmZM2dOXvWqV2XSpEl16zzxxBM57LDD8pOf/KSleMeKpUuX1p3j9OnTs2jRoqb6mDx5cnbfffesueaa+dWvfuX0GQDoTX2bB/CICgDj1ty5c/Oa17wmr3jFK/K73/2ubp2pU6fmtNNOyzbbbNPh6MaeJUuW5PLLL8/FF18suQEAjDkSHACMe3Pnzs0+++yTCy+8sO7rG220Ub761a92OCoAAMqQ4ACAJI899lgOPfTQYR9F2W+//TJnzpwORwUAQLMkOABgwLJly3LMMcfk/vvvr/v6+9///kyZMqXDUQEA0AynqADAIHfddVfe//7359RTT82ECSvvwbXZZptlzpw5+fznP1/ZeOutt15mz56dHXbYIeuuu27WWGONLFmyJA8++GAWLFiQn/70p8MmXKjWWHsvNt544xx88MHZdtttM2PGjCxZsiS33357vve97+Wee+7pWBwAwNhQUxRFUfqrnHHGGbV6fvazn1U6zrx58+qOc/3111fS/zHHHFO77LLLakuWLKk7znLLli2rXXPNNbWPfOQjtWnTprU83tKlS+v232yfd999d+2Pf/zjkDJlypS69S+//PK69d/5zneO+mv3yU9+sm7fp59++ph/L4aL/bjjjvtLnV122aV23nnnDRvPpz71qdqee+5Zt58//vGPtfe+972j+vq+4AUvGLbvo446qtKfM0VRFKUrhR7V7W8cRVEUpeLSqQTH29/+9mFvdPfYY4+W+z3kkENq119//Yg30sO5++67a29605taGne0CY6y7f/zP/+zbv1LLrlk1O/NcF+/Y489dsy/F8cff3zd/v7t3/6tlqT2rne9q7Zo0aIRx/7EJz5RS1K75ZZb6r7+85//fFRf349//ON1+33sscdqM2bMqPTnTFEURelK6Vv24ACAOk455ZTce++9dV87/PDDW+rzhBNOyNlnn50dd9yxpfabbrppTjnllHz5y19uqX0nfetb38qzzz475Pree++d9dZbr+V+d9hhh+ywww5Drj/66KM5/fTTm+5nrL0XkydPzpw5c3LiiSdm6tSpI9Zd/nX90Y9+VPf1PfbYI5tuumnLsRxwwAF1r8+dOzePPfZYy/0CQLtJcABAHcuWLcsvfvGLuq/ttddepfqaPHlyzjvvvMyZMycTJ45u+6sJEybkve99b77whS+Mqp92u+GGG3LNNdcMuT5lypQcddRRLfd75JFHDtkbJUkuvfTSLFq0qGH7sfpebLPNNvnCF76Q1VZr/KvZ8gTHqaeeWjeJtMYaa+SNb3xjS3FsuOGG2XXXXeu+dvbZZ7fUJwB0ik1GAWAY1157bV73utcNuf785z+/VD+nn356DjnkkGFfv//++3PllVdm4cKFWbx4cdZbb73MnDkze+2117B/zf/Hf/zH/OpXv8r3v//9UrF00rnnnpvdd999yPWDDz44J554Ykt9Dre64Kyzzmqq/Vh9Lw477LC6iZt6lic1rr/++vzmN7/JbrvtNqTOwQcf3NJmuEcccUTWWGONIdf/9Kc/5Xvf+17p/gCA6nT72SZFURSl4tKpPTiS1GbNmjXsPgjPe97zmurj3//934ftY+HChbX3vOc9w7adMWNG7bOf/Wxt8eLFddv//ve/r02aNKmpODq9B0eS2sYbb1w39ieeeKK2zjrrlH4/ttlmm9ozzzwzpL+77rqrZ96L4fbgWNWTTz5Zu+iii2qf+cxnau94xztqRx55ZO2YY46pfeQjH6m9/OUv/0t/H/7wh+u2f/rpp2ubbrpp6a/xBRdcULe/M888s/KfL0VRFKVrhR7V7W8cRVEUpeLSyQRHkmFPsjjooIMatt1jjz1qTz31VN3211xzTW3zzTdvKoZDDjlk2Dg++tGPNtVHNxIcSWoXXnhh3Xbvfve7S78XH/vYx+r29bWvfa1n3otGCY5nn322dvrppzedQBsuiVSr1Wof+tCHSn19J0+eXHv00Ufr9nX44Ye35edLURRF6UqhR3X7G0dRFEWpuHQ6wfHQQw/VHa+Z406HO2r2lltuqW2wwQal4vjEJz5Rt69mVy90K8Hxd3/3d3XbXXjhhaXfiyuvvLJuX3vvvXfPvBcjJTj+/Oc/1z7wgQ+U/rpcdNFFdfubN29eqX7e+MY31u1n4cKFbfnZUhRFUbpW6FHd/sZRFEVRKi6dTnDceeeddcf74Ac/OGK7gw46qG67pUuX1vbZZ5/ScUyePLl2xx131O3zb/7mbxq271aCY/LkybUHH3xwSLuyj6nMnDmzbgw33HBDw7Zj6b0YKcHx9a9/vaXv0eGONH766adrM2fObLqfM888s24/J598clt+thRFUZSulb7lFBUAGMETTzxR9/rkyZNHbDdnzpy6188999xcccUVpeNYsmTJsMegHnnkkaX765QlS5bk4osvHnJ9rbXWKhX3kUcemUmTJg25fv755zds2wvvxb333pt//ud/bqnt6aefnocffnjI9dVXX73UaSqzZs2qe73ZDVwBoNskOABgBEuWLKl7ffXVVx+2zTrrrJOXvexldV874YQTWo7lpJNOyjPPPDPker1TNMaS4ZIBr3rVq5ru48ADDxxy7Zlnnskpp5wyYrteeS8uueSSpo65rWfx4sW55JJL6r520EEHNdXHgQcemE022WTI9T/84Q+59NJLW4oLADpNggMAWjDSkZ6vec1rsuaaaw65fuutt7a0YmC522+/PTfffPOQ65tuumk233zzlvtttwsvvDC33XbbkOsvfelLM2PGjIbtN9xww+y5555Drl999dW55ZZbRmzbK+9FvWRJGWeeeWbd63vssUdmzpzZsP2hhx5a9/qFF144qrgAoJMkOACgBbXa8I+wvuQlL6l7/eqrrx71uL/73e+GXJswYUJe+tKXjrrvdvrRj3405NrUqVObeqTjyCOPrPtI0Lnnntuw7Xh5L374wx/mjjvuGHJ90qRJOfrooxu2nz179pBrtVotZ5xxRiXxAUAnSHAAwAjWWGONuteXLVs2bJutttqq7vUbb7xx1PHcfffdpcYcK0455ZS6SaFXv/rVDdu+8pWvHHLtySefbPh4SjK+3osf//jHda83ekxll112yTbbbDPk+k033ZSrrrqqktgAoBMmdjsAABjLpk2bVvf6cHtzJBn2kYDDDjts2P0gmrXZZpvVvd7Mox7ddO211+Y3v/lNdt1115Wuz5o1KzNmzMhjjz1Wt90666yTvffee8j1uXPn5qGHHmo47nh6L0499dS8613vGvL41O67757NN9+87gqPJHn9619f95Gr4RImADBWSXAAwAiGS3AMd7pKMvwNbr19JKoyffr0tvVdlXPPPXdIgmPq1Kl5wxvekK9//et12xxxxBFZa621hlz/7ne/29SY4+m9+PWvf53rr78+O++880rXJ02alDe+8Y359Kc/Xbfd/vvvP+Tas88+m9NOO60tcQJAu3hEBQCGMWnSpEydOrXua3fdddew7aZMmdKukIY1XJxjySmnnFJ35ctIj6kcfPDBQ6498MADTR9dOt7ei/POO6/u9eEeU9l8882zyy67DLl+7bXX5oYbbqg0NgBoNwkOABjGfvvtl0mTJtV9bf78+cO2G+kI2XZZbbWx/7/0hQsXZt68eUOuz5o1q+5KmSlTptTdsPOiiy4acQ+Uwcbbe3HKKadk6dKlQ67vtttudU93ef3rX5+JE4cu6K23KSwAjHVj/7chAOiS4U7gePjhh0dMcIx0hOx49/3vf3/ItWnTptU9TeV1r3td3UdMypzsMd7eizvuuCNXXnnlkOvLH1NZ1QEHHDDk2jPPPJNvf/vbbYkPANrJHhwAMIxV9zJY7uabbx6x3TPPPFP3r+JvfvOb88wzz1QS26pGemRmLDnttNPyuc99Luuss85K11/96lfnG9/4xpBrq1qwYEEuvvjipscbj+/F2WefnX333XfI9YMPPnilfThmzJiRvfbaa0i9q6++On/4wx/aGiMAtIMEBwDUsc4662TWrFl1X/vlL385YtslS5bU3YfhxhtvzG9+85tK4utVixcvzsUXX5w3vOENK11f/pjKokWLkhQrDurdpJc92WM8vhff/va386lPfWrI6pfddtstz3ve83L77bcnKVbI1NvA9fzzz+9InABQNY+oAEAdxx57bNZee+26r5177rkjtv3Tn/5U9/pWW2016rj6wZlnnjnk2vTp03PEEUf85fPXvva1WW+99VaqU6vVcuqpp5Yaazy+F4899lguu+yyIdcnTpy40mMqBx544JA6S5Ys8XgKAD1LggMA6jjqqKPqXp8/f34uv/zyEdvec889da/vvffeo46rH/zwhz/MHXfcMeT64EdSDjnkkCGv//a3v821115baqzx+l4Md4zu4FNp6q1QmjdvXu677762xQUA7STBAQCr+PCHP5ztt9++7mvNbHB544031r1eb7+D8areKR0ve9nL/nKayuzZs4e8PtwRqCMZr+/Fd7/73SxcuHDI9V133TXPe97zcthhh2WDDTYY8norX2MAGCskOABgkB122CEf/OAH6752//335ytf+UrDPubOnVv3+otf/OJh9/UYb0499dTUarWVrs2YMSOvf/3rc+ihh2ajjTZa6bWnn3669OMpyfh+Ly644IIh1yZOnJijjz667gqZRYsW5bTTTutEaADQFhIcADBgxowZOfnkkzN9+vS6r59wwgl56KGHGvZz3nnn1d37YcKECXnf+9436jj7wTXXiIKfvwAAIABJREFUXJPrrrtuyPVDDjkkhx9++JDr8+bNa+l0kvH8Xgy3l8ZBBx1UdwPXuXPn5rHHHmt3WADQNhIcAJBkgw02yHnnnZfddtut7uu//OUv85nPfKapvpYsWTLsRqSHHnpojjzyyJbjTIoNMq+++uocdthho+qn2+o9DvGyl70s+++//5DrP/jBD1oaYzy/F/PmzctNN9005Pry01RW1erXGADojJqiKIrSX+WMM86o1fOzn/2s5T5f8YpX1ObPn1+331qtVnv44YdrO++8c6k+X/CCF9SefPLJuv0tXLiwtv3227cU68Ybb1y78cYba7Varfb000/XPv7xjzfVbunSpXVjmTZtWkfa1yszZ86sLVmyZNiv+3KPPvroqMYZS+/F8ccfXzeOb37zm235efnc5z7X8Otbq9VqDz30UG3y5MltiUFRFEUZc4Ue1e1vHEVRFKXiUmWCY/bs2bVzzjmntmzZsmFv/J566qnaYYcd1lKsJ5xwwrD93nnnnaWTJvvuu2/t1ltvHdLXD37wg9qUKVNGbDsWExxJapdddtmwX6Plvve97436+2asvBedTnBsu+22I35/L3fWWWe1ZXxFURRlTJa+NbHbAQBAFSZOnJgtt9xy2NemT5+e5z73udlqq62y8847Z/fdd8/WW289Yp9PPfVUjj322GEfcWjkQx/6UPbbb7+88IUvHPLazJkzc/nll+fEE0/MJz/5ySxZsmTYftZbb7184AMfyJw5c7LmmmvWfX3x4sUtxdhtZ599dt1HUgb7zne+M+pxxut7MX/+/Pzyl79seCzu97///Q5FBADtM6HbAbRZX2enAMajM844Y9T7JjTjgQceyDve8Y5RH5u500475dJLL617JOdyjz76aObNm5drr702999/fx599NFMnTo1m2++eXbaaafsvffemTFjRt22CxYsyAEHHJA77rhjxDiWLl2aSZMmDbk+ffr0LFq0qOE8Rtt+ONOmTctdd92Vtddeu+7r99xzTzbbbLOW+x9sLLwXxx9/fI477rgh10866aS8/e1vLz+pJvzTP/1TvvjFLw77+n333ZdNNtmkLWMDMCb1ex6gb3V76Y+iKIpScRnuEZUqzZ07t7bVVltVFvO+++5be/DBByuP89Zbb61tt912TcUwVh9RSVL77ne/O+wcv/GNb1T6/dPt96LTj6gkqa233nq1J554YtjYv/Wtb3X0Z1hRFEXpeulbTlEBgAELFizI2972tsyePTsLFiyorN+f/exneeUrX1n3RItWzZs3L7Nnz660z24588wzh31tuKNOWzUe34uHHnooP/3pT4d9vYpHgABgLJDgAGBcW7x4cS677LK85S1vydZbb52TTz65LeNcc8012XPPPXPiiSeOao+GRYsW5bOf/WxmzZqVe+65p8IIu+ecc87J3XffPeT6TTfdlHnz5lU+3nh8L773ve/VvX7HHXfkoosu6nA0ANAeEhwA9L1nn302Tz31VB5++OHMnz8/P/vZz/LVr341b3nLWzJz5swccMABOfXUU9sex6JFi3Lcccdl++23z4knnpjbbrut6bZ33313vvnNb2aXXXbJhz/84TZG2R0/+tGPhlw7//zz2zbeeHsvzjrrrDzxxBNDrl944YVdiAYA2qPfNxfp6+eLAOh9u+yyS2bPnp0tt9wyG264YaZMmZJnn302Tz75ZB577LHMnz8/v/71r3P55Zd3O9S+18/vxSte8Yq6KzVe+tKX5oorruhCRAB0Ud/mAfp2YgMkOACAce/b3/52jj766JWu/f73v892223XpYgA6KK+zQN4RAUAoI9Nnjw5Bx544JDrF1xwQReiAYD2keAAAOhjb3rTm7L++uuvdK1Wq+W0007rUkQA0B4SHAAAfWzVR1OS5Lrrrst1113XhWgAoH0kOAAA+tQhhxySffbZZ8j1c889twvRAEB79e3mIgNsMgoAjEsbbrhhrrzyymyxxRYrXX/88cez1VZb5cEHH+xSZAB0Wd/mAazgAADoM7vssksuueSSIcmNJPnOd74juQFAX+rbzM0AKzgAgL617bbbZrvttsvjjz+e6dOn5/nPf3722Wef7Lfffpk8efKQ+o888kh23HHH3HPPPV2IFoAxom/zABO7HQAAAK3Zf//985WvfKXp+p/+9KclNwDoWx5RAQDo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JEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEkjNjXpAmhg+wNbDLjvrcCJE8p73Plb9snkb9knk79ln0z+ln0y+Vv2yeRv2SeTv2WfTP6WfTL5L+SySxqR44DpAbfLJ5i3Zbfslt2yW3bLbtktu2W37Jbdsi+GsmueWW/SBZAkSZIkSRqWDRySJEmSJGnBs4FDkiRJkiQteMsmXQAN7BPANwfcd90E8x53/pZ9Mvlb9snkb9knk79ln0z+ln0y+Vv2yeRv2SeTv2WfTP4LueySJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSFrapSRdAkiRJmmObAU9IHl8MnDKhsqjsUcDq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';

      try {
        //ensure the base64 string without URI Scheme
        let logobase64 = logo.replace('data:image/png;base64,', '');

        await SunmiV2Printer.printerInit();

        await SunmiV2Printer.setAlignment(1);

        //图片bitmap对象(最大宽度384像素，超过无法打印并且回调callback异常函数)
        await SunmiV2Printer.printBitmap(
          logobase64,
          384 /*width*/,
          400 /*height*/,
        );
      } catch (err) {
        console.log(err?.message);
        ToastAndroid.show(err?.message ?? 'in catch', 1500);
      }
      // viewRef.current.capture().then(
      //   async uri => {
      //     console.log(uri);
      //     try {
      //       fetch(uri)
      //         .then(response => response.blob())
      //         .then(blob => {
      //           var reader = new FileReader();
      //           reader.onload = async function () {
      //             try {
      //               let logobase64 = this.result.replace(
      //                 'data:image/png;base64,',
      //                 '',
      //               );

      //               // ToastAndroid.show('printing', 1500);
      //               await SunmiV2Printer.printerInit();
      //               // ToastAndroid.show('next printing', 1500);

      //               await SunmiV2Printer.setAlignment(1);

      //               await SunmiV2Printer.printBitmap(
      //                 logobase64,
      //                 384 /*width*/,
      //                 380 /*height*/,
      //               );
      //             } catch (err) {
      //               ToastAndroid.show(err?.message, 500);
      //             }
      //             // try {
      //             //   let logobase64 = this.result.replace(
      //             //     'data:image/png;base64,',
      //             //     '',
      //             //   );

      //             //   // console.log(this.result);
      //             //   ToastAndroid.show(
      //             //     logobase64?.length ?? 'base64 len N/A',
      //             //     500,
      //             //   );

      //             //   // ToastAndroid.show('printing', 1500);
      //             //   // await SunmiV2Printer.printerInit();
      //             //   // // ToastAndroid.show('next printing', 1500);

      //             //   // await SunmiV2Printer.setAlignment(1);

      //             //   // await SunmiV2Printer.printBitmap(
      //             //   //   logobase64,
      //             //   //   384 /*width*/,
      //             //   //   380 /*height*/,
      //             //   // );

      //             //   // console.log(SunmiPrinter);

      //             //   // SunmiPrinter.printerInit();
      //             //   // SunmiPrinter.printBitmap(logobase64, 384);
      //             // } catch (err) {
      //             //   ToastAndroid.show(
      //             //     err?.message ?? 'inside print command',
      //             //     1500,
      //             //   );
      //             // }
      //           }; // <--- `this.result` contains a base64 data URI
      //           reader.readAsDataURL(blob);
      //         });
      //     } catch (err) {
      //       ToastAndroid.show(err?.message, 500);
      //     }
      //   },
      //   error => {
      //     console.log('in error', error);
      //     // throw new Error(typeof error === String ? error : 'Internal error');
      //   },
      // );
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
