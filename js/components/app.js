import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import idx from 'idx';

import Tips from './tips';
import FocusBox from './focus-box';
import { inputIsValid } from '../money-calculator';
import accelerationObservable, {registerAccelerometerEvent} from '../accelerometer';
import cropImageAndGetBase64 from '../image-processor';
import getVision from '../request';

export const BOX_WIDTH = 100;
export const BOX_HEIGHT = 50;
export const BOX_LEFT = 0.7;
export const BOX_TOP = 0.5;
const DISABLE_CAMERA_TIMEPUT = 5000;
const ENABLE_CAMERA_TIMEPUT = 2000;

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
  tip: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  retake : {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  retakeReminder: {
    color: 'white',
    fontSize: 14,
    paddingTop: 6,
  },
});

export default class WhatToTip extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      amount: null,
      cameraInited: false,
      autoCaptureEnabled: true,
    };
  }

  componentDidMount() {
    registerAccelerometerEvent(this.autoTakePicture);
    setTimeout(() => {
      this.setState({
        cameraInited: true,
      });
    }, DISABLE_CAMERA_TIMEPUT);
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

  handleResult = amount => {
    if (!inputIsValid(amount)) {
      setTimeout(
        this.enableAutoCapture,
        ENABLE_CAMERA_TIMEPUT);
    } else {
      this.setState({ amount });
    }
  };

  callGetVisionAndHandleResult = base64 => {
    getVision(base64, this.handleResult);
  };

  autoTakePicture = async () => {
    if (!this.camera || !this.state.cameraInited || !this.state.autoCaptureEnabled) {
      return;
    }
    const options = {
      quality: 0.6,
      base64: true,
    };
    const data = await this.camera.takePictureAsync(options);
    cropImageAndGetBase64(
      data,
      {
        BOX_WIDTH,
        BOX_HEIGHT,
        BOX_LEFT,
        BOX_TOP
      },
      this.callGetVisionAndHandleResult);
    console.log('~~~~~~~~~~~~~~~~~~~take picture!')
    this.disableAutoCapture();
  };

  reTakePicture = async () => {
    this.enableAutoCapture();
    this.setState({
      amount: null,
    });
  };

  render() {
    const { cameraInited, autoCaptureEnabled, amount } = this.state;
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
        {cameraInited &&
          <FocusBox
            w={BOX_WIDTH}
            h={BOX_HEIGHT}
            l={BOX_LEFT}
            t={BOX_TOP}
          />
        }
        {typeof amount === 'string' && !autoCaptureEnabled && (
          <View style={styles.tip}>
            <Tips amount={this.state.amount}/>
          </View>
        )}
        {typeof amount === 'string' && !autoCaptureEnabled && (
          <TouchableOpacity
            onPress={this.reTakePicture}
            style={styles.retake}>
            <Text style={styles.retakeReminder}> Tap anywhere to re-scan </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
