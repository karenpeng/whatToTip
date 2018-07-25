import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'ract-native';

import {TIP_OPTIONS} from '../../utils/money-calculator';

const styles = StyleSheet.create({
  selectedOptionText: {
    color: 'white',
    fontSize: 16,
  },
  nonSelectedOptionText: {
    fontSize: 14
  },
});

export default class TipsOptionSwiper extends React.Component {

  saveRef: Function = (ref: ScrollView) => (this.scrollViewRef = ref);

  render() {
    return (
      <ScrollView
        horizontal
        onScroll={() => {console.log()}}
        pagingEnabled
        ref={this.saveRef}
        showsHorizontalScrollIndicator={false}
      >
        {TIPS_OPTIONS.map(option => (
          <View key={option} style={{
            paddingLeft: 12,
            paddingRight: 12,
            margin: 6,
          }}>
            <Text>{ `${option * 100}%`}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}
