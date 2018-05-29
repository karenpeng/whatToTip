import React from 'react';
import { Animated } from 'react-native';

const LOOP_DURATION = 900;

export default class UpAndDownAnimation extends React.Component {
  state = {
    upAndDownAnim: new Animated.Value(-1),
  }

  componentDidMount() {
    this.loopAnimation();
  }

  loopAnimation = () => {
    Animated.sequence([
      Animated.timing(
        this.state.upAndDownAnim,
        {
          toValue: this.props.height + 1,
          duration: LOOP_DURATION,
        }
      ),
      Animated.timing(
        this.state.upAndDownAnim,
        {
          toValue: -1,
          duration: LOOP_DURATION,
        }
      ),
    ]).start(this.loopAnimation);
  }

  render() {
    let { upAndDownAnim } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          position: 'absolute',
          top: upAndDownAnim,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
