import React from 'react';
import { Animated, Easing } from 'react-native';

const SLOW_SLIDE_UP_DURATION = 500;
const QUICK_SLIDE_UP_DURATION = 30;
const START_BOTTOM = -500;
const END_BOTTOM = 0;

export default class SlideUpAnimation extends React.Component {
  state = {
    slideUpAnim: new Animated.Value(START_BOTTOM),
  };

  componentWillEnter(cb) {
    Animated.timing(
      this.state.slideUpAnim,
      {
        toValue: END_BOTTOM,
        delay: 0,
        easing: Easing.linear(),
        duration: SLOW_SLIDE_UP_DURATION,
      }
    ).start(cb);
  }

  componentWillLeave(cb) {
    this.leave(SLOW_SLIDE_UP_DURATION, cb);
  }

  leave(duration, cb) {
    Animated.timing(
      this.state.slideUpAnim,
      {
        toValue: START_BOTTOM,
        delay: 0,
        easing: Easing.linear(),
        duration: duration,
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
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            onSlideDown: this.leave.bind(this, QUICK_SLIDE_UP_DURATION),
          })
        )}
      </Animated.View>
    );
  }
}
