import React from 'react';
import { Animated } from 'react-native';

export default class SlideUpAnimation extends React.Component {
  state = {
    slideUpAnim: new Animated.Value(-500),
  }

  componentDidMount() {
    Animated.timing(
      this.state.slideUpAnim,
      {
        toValue: 0,
        duration: 500,
      }
    ).start();
  }

  componentWillUnmount() {
    Animated.timing(
      this.state.slideUpAnim,
      {
        toValue: -500,
        duration: 100,
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
