import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const createStyle = data => {
  const { w, h, l, t } = data;
  return {
    position: 'absolute',
    left: `${l * 100}%`,
    top: `${t * 100}%`,
    width: w,
    height: h,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  };
};

export default class FocusBox extends React.Component {
  render() {
    return (
      <View style={createStyle(this.props)}></View>
    );
  }
}
