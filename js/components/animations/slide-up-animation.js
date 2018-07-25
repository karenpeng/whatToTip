import React from 'react';
import { Animated, Easing } from 'react-native';

const SLIDE_UP_DURATION = 500;
const START_BOTTOM = -500;
const END_BOTTOM = 0;

export default class SlideUpAnimation extends React.Component {
  state = {
    slideUpAnim: new Animated.Value(START_BOTTOM),
  };

  componentDidMount() {
    Animated.timing(
      this.state.slideUpAnim,
      {
        toValue: END_BOTTOM,
        delay: 0,
        easing: Easing.linear(),
        duration: SLIDE_UP_DURATION,
      }
    ).start();
  }

  render() {
    let { slideUpAnim } = this.state;
    return (
      <Animated.View
        style={{
          ...this.props.style,
          position: 'absolute',
          bottom: slideUpAnim,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
