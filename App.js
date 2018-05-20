/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import getVision from './request';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

export default class BadInstagramCloneApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      response: {},
    };
  }

  takePicture = async function() {
    if (!this.camera) {
      return;
    }
    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options);
    console.log(data.base64);
    // const response = await
    getVision(data.base64);
    //this.setState({response});
  };

  render() {
    //console.log(this.state.response)
    return (
      <View style={styles.container}>
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
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
          >
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
