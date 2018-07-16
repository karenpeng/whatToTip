import React from 'react';
import { Animated, Easing } from 'react-native';

const SLIDE_UP_DURATION = 500;
const START_BOTTOM = -500;
const END_BOTTOM = 0;

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
        toValue: END_BOTTOM,
        delay: 0,
        easing: Easing.linear(),
        duration: SLIDE_UP_DURATION,
      }
    ).start(cb);
  }

  componentWillLeave(cb) {
    this.leave(cb);
  }

  leave(cb) {
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
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            onSwipeDown: ()=>{console.log('ouch!!!')}
          })
        )}
      </Animated.View>
    );
  }
}
