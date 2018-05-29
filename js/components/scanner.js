import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import UpAndDownAnimation from './animations/up-and-down-animation';

const createStyle = data => {
  const { w, h, l, t } = data;
  return {
    position: 'absolute',
    left: `${l * 100}%`,
    top: `${t * 100}%`,
    width: w,
    height: h,
  };
};

export default class Scanner extends React.Component {

  render() {
    return (
      <View style={createStyle(this.props)}>
        <View style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}>
          {this.props.isScanning && (
            <UpAndDownAnimation
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'white',
              } }
              height={this.props.h}>
            </UpAndDownAnimation>
          )}
          <Image
            source={require('../../images/top-left.png')}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              top: 0,
              left: 0,
            }}
          />
          <Image
            source={require('../../images/top-right.png')}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              top: 0,
              right: 0,
            }}
          />
          <Image
            source={require('../../images/bottom-right.png')}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              bottom: 0,
              right: 0,
            }}
          />
          <Image
            source={require('../../images/bottom-left.png')}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              bottom: 0,
              left: 0,
            }}
          />
        </View>
      </View>
    );
  }
}
