import React from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated
} from "react-native";

export default class Draggable extends React.Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY(),
      panResponder: PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          // The gesture has started. Show visual feedback so the user knows
          // what is happening!

          // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
          // The most recent move distance is gestureState.move{X,Y}

          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
          console.log(evt)
          console.log(gestureState)
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
        },
      }),
    };
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    return (
      <Animated.View
        { ...this.state.panResponder.panHandlers }
        style={panStyle}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
