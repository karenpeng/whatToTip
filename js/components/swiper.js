import React from 'react';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class Swiper extends React.Component {
  render() {
    return (
      <GestureRecognizer
        config={{
          velocityThreshold: 0.01,
          directionalOffsetThreshold: 200,
        }}
        style={{
          flex: 1,
        }}
        onSwipeDown={() => {
          this.props.onSlideDown();
          this.props.handleReset();
        }}
      >
        {this.props.children}
      </GestureRecognizer>
    );
  }
}
