import React from 'react';
import { Animated, Easing } from 'react-native';

const SLIDE_UP_DURATION = 500;
const START_BOTTOM = -500;

export default class SlideUpAnimation extends React.Component {
  constructor() {
    super();
    this.state = {
      slideUpAnim: new Animated.Value(START_BOTTOM),
    };
  }

  componentWillEnter(cb) {
    Animated.timing(
      this.state.slideUpAnim,
      {
        toValue: 0,
        delay: 0,
        easing: Easing.linear(),
        duration: SLIDE_UP_DURATION,
      }
    ).start(cb);
  }

  componentWillLeave(cb) {
    Animated.timing(
      this.state.slideUpAnim,
      {
        toValue: START_BOTTOM,
        delay: 0,
        easing: Easing.linear(),
        duration: SLIDE_UP_DURATION,
      }
    ).start(cb);
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
