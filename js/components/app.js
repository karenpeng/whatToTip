import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  AsyncStorage,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import idx from 'idx';

import Payment from './payment/payment';
import Scanner from './scanner';
import SlideUpAnimation from './animations/slide-up-animation';
import { inputIsValid } from '../utils/payment-calculator';
import accelerationObservable, {registerAccelerometerEvent} from '../utils/accelerometer';
import cropImageAndGetBase64 from '../utils/image-processor';
import getVision from '../utils/request';
import constants from '../../constants';

export const SCANNER_WIDTH = 100;
export const SCANNER_HEIGHT = 50;
export const SCANNER_LEFT = 0.68;
export const SCANNER_TOP = 0.2;
// const ENABLE_CAMERA_TIMEOUT = 2000;
const ENABLE_CAMERA_TIMEOUT = 0;
const CAMERA_OPTIONS = {
  quality: 0.6,
  base64: false,
};
const VIBRATION_DURATION = 100;
const CAMERA_CAPTURE_MAXIMUM = 5;
const tipOptionKey = constants.storageKey;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  preview: {
    flex: 1,
    backgroundColor: 'black',
  },
  tapContent : {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  tapContentReminder: {
    fontSize: 16,
    marginTop: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 4,
  },
});

export default class WhatToTip extends React.Component {
  state = {
    autoCaptureEnabled: false,
    result: null,
    cameraInited: false,
    captureCounter: 0,
    tipOption: 0.15,
  };

  componentDidMount() {
    registerAccelerometerEvent(this.autoTakePicture);
    this.onTipOptionLoad();
    setTimeout(() => {
      this.setState({
        autoCaptureEnabled: true,
        cameraInited: true,
      });
    }, 5000);
  }

  onTipOptionLoad = async() => {
    try {
      const tipOptionResult = await AsyncStorage.getItem(tipOptionKey);
      if (typeof tipOptionResult === 'string') {
        const tipOption = parseFloat(tipOptionResult);
        if (!Number.isNaN(tipOption)) {
          this.setState({ tipOption });
        }
      }
    } catch (error) {
     console.log(error);
    }
  };

  onTipOptionSelect = async(tipOption) => {
    this.setState({ tipOption });
    try {
      await AsyncStorage.setItem(tipOptionKey, `${tipOption}`);
    } catch (error) {
      console.log(error);
    }
  };

  disableAutoCapture = () => {
    this.setState({
      autoCaptureEnabled: false,
    });
  };

  enableAutoCapture = () => {
    this.setState({
      autoCaptureEnabled: true,
    });
  };

  callGetVisionAndHandleResult = base64 => {
    //getVision(base64, this.handleResult);
    this.handleResult('$123.56')
  };

  handleResult = result => {
    if (!inputIsValid(result)) {
      setTimeout(this.enableAutoCapture, ENABLE_CAMERA_TIMEOUT);
    } else {
      this.setState({ result });
      Vibration.vibrate(VIBRATION_DURATION);
    }
  };

  autoTakePicture = async () => {
    if (!this.camera || !this.state.autoCaptureEnabled || this.state.captureCounter > CAMERA_CAPTURE_MAXIMUM) {
      return;
    }
    this.disableAutoCapture();
    this.setState({
      captureCounter: this.state.captureCounter + 1,
    });
    const data = await this.camera.takePictureAsync(CAMERA_OPTIONS);
    cropImageAndGetBase64(
      data,
      {
        SCANNER_WIDTH,
        SCANNER_HEIGHT,
        SCANNER_LEFT,
        SCANNER_TOP
      },
      this.callGetVisionAndHandleResult
    );
  };

  handleReset = () => {
    const { autoCaptureEnabled, result } = this.state;
    if (autoCaptureEnabled && result === null) {
      return;
    }
    setTimeout(this.enableAutoCapture, ENABLE_CAMERA_TIMEOUT);
    this.setState({
      result: null,
      captureCounter: 0,
    });
  };

  handleResizeScanner = () => {
    const { autoCaptureEnabled, result } = this.state;
    if (autoCaptureEnabled && result === null) {
      return;
    }
    this.setState({
      result: null,
      captureCounter: 0,
    });
  }

  render() {
    const { autoCaptureEnabled, result, cameraInited, tipOption } = this.state;
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
          />
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.tapContent}>
          <Text style={styles.tapContentReminder}>
           {!cameraInited ? 'Align payment total with the frame' :
             (result === null ?
             'Scanning payment total...' : 'Tap anywhere to re-scan')}
          </Text>
        </TouchableOpacity>
        <Scanner
          w={SCANNER_WIDTH}
          h={SCANNER_HEIGHT}
          l={SCANNER_LEFT}
          t={SCANNER_TOP}
          isScanning={result === null}
          onDragEnd={this.handleReset}
          onDragStart={() => {}}
        />
        {!autoCaptureEnabled && result !== null &&
          <SlideUpAnimation
            key="slideUp"
            style={{
              left: 0,
              width: '100%',
          }}>
            <Payment
              result={result}
              tipOption={tipOption}
              onTipOptionSelect={this.onTipOptionSelect}
            />
          </SlideUpAnimation>
          }
      </View>
    );
  }
}
