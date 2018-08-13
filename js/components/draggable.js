import React from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated
} from "react-native";
import idx from 'idx';

export default class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };
  }

  componentDidMount() {
    this._val = {x: 0, y: 0};
    this.state.pan.addListener(value => this._val = value);
    this.panResponder = PanResponder.create({
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
        console.log(gestureState)
        Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]);
        // adjusting delta value
        this.state.pan.setValue({ x:0, y:0})
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        //this.props.onDragEnd();
      },
    });
  }

  render() {
    console.log(this.panResponder)
    const panHandlers = idx(this, _ => _.panResponder.panHandlers);
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    console.log(panStyle)
    return (
      <Animated.View
      {...panHandlers}
        style={panStyle}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
