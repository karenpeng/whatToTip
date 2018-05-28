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
import cropImageAndGetBase64 from '../image-processor';
import getVision from '../request';
import accelerationObservable, {registerAccelerometerEvent} from '../accelerometer';

export const BOX_WIDTH = 100;
export const BOX_HEIGHT = 50;
export const BOX_LEFT = 0.7;
export const BOX_TOP = 0.5;
const DISABLE_CAMERA_TIMEPUT = 9000;

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
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
  },
});

export default class WhatToTip extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      amount: null,
      cameraEnabled: false,
    };
  }

  componentDidMount() {
    registerAccelerometerEvent(this.takePicture);
    setTimeout(this.enableCamera, DISABLE_CAMERA_TIMEPUT);
  }

  disableCamera = () => {
    this.setState({
      cameraEnabled: false,
    });
  }

  enableCamera = () => {
    this.setState({
      cameraEnabled: true,
    });
  }

  handleResult = amount => {
    if (!amount) {
    //  this.enableCamera();
    } else {
      this.setState({ amount });
    }
  };

  callGetVisionAndHandleResult = base64 => {
    getVision(base64, this.handleResult);
  };

  takePicture = async () => {
    if (!this.state.cameraEnabled || !this.camera) {
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
    this.disableCamera();
  };

  render() {
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
        <FocusBox
          w={BOX_WIDTH}
          h={BOX_HEIGHT}
          l={BOX_LEFT}
          t={BOX_TOP}
        />
        {typeof this.state.amount === 'string' && !this.state.cameraEnabled && (
          <View style={styles.tip}>
            <Tips amount={this.state.amount}/>
          </View>
          <TouchableOpacity
            onPress={this.enableCamera}
            style = {styles.retake}>
            <Text style={{fontSize: 12}}> Re-take </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
