import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import UpAndDownAnimation from './animations/up-and-down-animation';
import Draggable from './draggable';

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

// TODO: make it flexible for moving around
export default class Scanner extends React.Component {
  render() {
    const { isScanning, h, onDragStart, onDragEnd } = this.props;
    return (
      <View style={createStyle(this.props)}>
        <View style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}>
          {isScanning && (
            <UpAndDownAnimation
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'white',
              } }
              height={h}>
            </UpAndDownAnimation>
          )}
          <Draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            {/* <Image
              source={require('../../images/top-left.png')}
              style={{
                width: 20,
                height: 20,
              }}
            /> */}
            <View style={{width:20, height: 20, backgroundColor: 'salmon'}}/>
          </Draggable>
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
