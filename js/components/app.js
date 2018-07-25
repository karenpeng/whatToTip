import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import idx from 'idx';

import Tips from './tips/tips';
import Scanner from './scanner';
import SlideUpAnimation from './animations/slide-up-animation';
import { inputIsValid } from '../money-calculator';
import accelerationObservable, {registerAccelerometerEvent} from '../utils/accelerometer';
import cropImageAndGetBase64 from '../utils/image-processor';
import getVision from '../utils/request';

export const SCANNER_WIDTH = 100;
export const SCANNER_HEIGHT = 50;
export const SCANNER_LEFT = 0.68;
export const SCANNER_TOP = 0.2;
const ENABLE_CAMERA_TIMEOUT = 2000;
const CAMERA_OPTIONS = {
  quality: 0.6,
  base64: false,
};
const VIBRATION_DURATION = 100;
const CAMERA_CAPTURE_MAXIMUM = 5;

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
    color: '#00a5ff',
    fontSize: 16,
    marginTop: 16,
  },
});

export default class WhatToTip extends React.Component {
  state = {
    autoCaptureEnabled: false,
    result: null,
    cameraInited: false,
    captureCounter: 0,
  };

  componentDidMount() {
    registerAccelerometerEvent(this.autoTakePicture);
    setTimeout(() => {
      this.setState({
        autoCaptureEnabled: true,
        cameraInited: true,
      });
    }, 5000);
  }

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
    getVision(base64, this.handleResult);
    // this.handleResult('$123.56')
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
      captureCounter: this.state.captureCounter + 1
    });
    console.log('~~~~~~~~~~~~~~~~~~~take picture!')
    const data = await this.camera.takePictureAsync(CAMERA_OPTIONS);
    cropImageAndGetBase64(
      data,
      {
        SCANNER_WIDTH,
        SCANNER_HEIGHT,
        SCANNER_LEFT,
        SCANNER_TOP
      },
      this.callGetVisionAndHandleResult);
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

  render() {
    const { autoCaptureEnabled, result, cameraInited } = this.state;
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
            flashMode={RNCamera.Constants.FlashMode.auto}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
          />
        </View>
        <TouchableOpacity
          onPress={this.handleReset}
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
        />
        {!autoCaptureEnabled && result !== null &&
          <SlideUpAnimation
            key="slideUp"
            style={{
              left: 0,
              width: '100%',
          }}>
            <Tips
              result={this.state.result}
              dollarSign={this.state.dollarSign}
            />
          </SlideUpAnimation>
          }
      </View>
    );
  }
}
