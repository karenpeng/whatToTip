import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {TIPS_OPTIONS} from '../../utils/money-calculator';

const styles = StyleSheet.create({
  selectedOptionText: {
    fontSize: 46,
  },
  nonSelectedOptionText: {
    fontSize: 20
  },
});

export default class TipsOptionSwiper extends React.Component {

  saveRef: Function = (ref: ScrollView) => (this.scrollViewRef = ref);

  render() {
    const { selectedTipOption, onTipOptionSelect } = this.props;
    return (
      <ScrollView
        horizontal
        onScroll={() => {console.log()}}
        pagingEnabled
        ref={this.saveRef}
        showsHorizontalScrollIndicator={false}
        style={{
          margin: 4,
        }}>
        {TIPS_OPTIONS.map(option => (
          <TouchableOpacity
            key={option}
            onPress={onTipOptionSelect(option)}
            style={{
              padding: 10,
              margin: 6,
              justifyContent: 'center',
            }}>
            <Text style={
              selectedTipOption === option ?
              styles.selectedOptionText : styles.nonSelectedOptionText
            }>{ `${option * 100}%`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}
