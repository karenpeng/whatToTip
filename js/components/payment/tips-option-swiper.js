import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import {TIPS_OPTIONS} from '../../utils/money-calculator';

const styles = StyleSheet.create({
  selectedOptionText: {
    fontSize: 26,
  },
  nonSelectedOptionText: {
    fontSize: 24
  },
});

export default class TipsOptionSwiper extends React.Component {

  saveRef: Function = (ref: ScrollView) => (this.scrollViewRef = ref);

  render() {
    return (
      <View
        style={{
          margin: 4,
          alignItems: 'center',
        }}>
        <ScrollView
          horizontal
          onScroll={() => {console.log()}}
          pagingEnabled
          ref={this.saveRef}
          showsHorizontalScrollIndicator={false}>
          {TIPS_OPTIONS.map(option => (
            <View key={option} style={{
              padding: 10,
              margin: 6,
            }}>
              <Text style={styles.selectedOptionText}>{ `${option * 100}%`}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
