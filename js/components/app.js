import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import TransitionGroup from 'react-native-transitiongroup';
import idx from 'idx';

import Swiper from './swiper';
import Tips from './tips';
import Scanner from './scanner';
import SlideUpAnimation from './animations/slide-up-animation';
import { inputIsValid } from '../money-calculator';
import accelerationObservable, {registerAccelerometerEvent} from '../accelerometer';
import cropImageAndGetBase64 from '../image-processor';
import getVision from '../request';

export const SCANNER_WIDTH = 100;
export const SCANNER_HEIGHT = 50;
export const SCANNER_LEFT = 0.68;
export const SCANNER_TOP = 0.32;
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
    color: 'white',
    fontSize: 16,
    marginTop: 16,
  },
});

export default class WhatToTip extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      autoCaptureEnabled: false,
      amount: null,
      cameraInited: false,
      captureCounter: 0,
    };
  }

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
    //getVision(base64, this.handleResult);
    this.handleResult('123.56')
  };

  handleResult = amount => {
    if (!inputIsValid(amount)) {
      setTimeout(this.enableAutoCapture, ENABLE_CAMERA_TIMEOUT);
    } else {
      this.setState({ amount });
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

  handleTap = () => {
    const { autoCaptureEnabled, amount } = this.state;
    if (autoCaptureEnabled && amount === null) {
      return;
    }
    setTimeout(this.enableAutoCapture, ENABLE_CAMERA_TIMEOUT);
    this.setState({
      amount: null,
      captureCounter: 0,
    });
  };

  render() {
    const { autoCaptureEnabled, amount, cameraInited } = this.state;
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
          onPress={this.handleTap}
          style={styles.tapContent}>
          <Text style={styles.tapContentReminder}>
           {!cameraInited ? 'Align payment total with the frame' :
             (amount === null ?
             'Scanning payment total...' : 'Tap anywhere to re-scan')}
          </Text>
        </TouchableOpacity>
        <Scanner
          w={SCANNER_WIDTH}
          h={SCANNER_HEIGHT}
          l={SCANNER_LEFT}
          t={SCANNER_TOP}
          isScanning={amount === null}
        />
        <TransitionGroup>
          {!autoCaptureEnabled && amount !== null &&
            <SlideUpAnimation
              key="slideUp"
              style={{
                left: 0,
                width: '100%',
                backgroundColor: 'rgba(250, 250, 255, 0.6)'
            }}>
              <Swiper>
                <Tips amount={this.state.amount}/>
              </Swiper>
            </SlideUpAnimation>
          }
        </TransitionGroup>
      </View>
    );
  }
}
