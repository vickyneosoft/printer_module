package com.printerdemo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import androidx.annotation.NonNull;

import com.ahmedelsayed.sunmiprinterutill.PrintMe;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class PrintModule extends ReactContextBaseJavaModule {
    private PrintMe printMe;
    PrintModule(ReactApplicationContext context) {
        super(context);
        printMe = new PrintMe(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "PrintModule";
    }

    @ReactMethod
    public void printBitmap(String data, Promise p) {
        try {
            printMe.sendTextToPrinter("Testing .. PrintMe",18,true,false,2);
            byte[] decodedString = Base64.decode(data, Base64.DEFAULT);
            Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
            printMe.sendViewToPrinter(decodedByte);
            p.resolve("Success");
        } catch (Exception e) {
            p.reject("Error", e.getLocalizedMessage());
        }
    }
}
