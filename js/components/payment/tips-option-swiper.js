import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import idx from 'idx';

import {TIPS_OPTIONS} from '../../utils/payment-calculator';

const TIPS_OPTION_MARGIN = 4;

const styles = StyleSheet.create({
  selectedOptionText: {
    fontSize: 46,
  },
  nonSelectedOptionText: {
    fontSize: 20
  },
});

export default class TipsOptionSwiper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedoptionWidth: null,
      nonSelectedOptionWidth: null,
      selectedIndex: TIPS_OPTIONS.indexOf(this.props.selectedTipOption),
      dotIndex: -1,
    };
  }

  saveRef = ref => (this.scrollView = ref);

  onScroll = event => {
    //console.log(event.nativeEvent)
  };

  getOptionWidth = isSelected => event => {
    const width = idx(event, _ => _.nativeEvent.layout.width);
    if (width) {
      this.setState({
        [isSelected ? 'selectedoptionWidth' : 'nonSelectedOptionWidth']: width
      });
    }
  }

  adjustIntialScroll = event => {
    const viewWidth = idx(event, _ => _.nativeEvent.layout.width);
    const { selectedoptionWidth, nonSelectedOptionWidth, selectedIndex } = this.state
    console.log(this.state)
    console.log(viewWidth)
    if (viewWidth && selectedoptionWidth && nonSelectedOptionWidth) {
      if (
        TIPS_OPTION_MARGIN * 2 * TIPS_OPTIONS.length +
        nonSelectedOptionWidth * (TIPS_OPTIONS.length - 1) +
        selectedoptionWidth <= viewWidth
      ) {
        return;
      }

      if (
        TIPS_OPTION_MARGIN * 2 * (selectedIndex + 1) +
        nonSelectedOptionWidth * selectedIndex +
        selectedoptionWidth > viewWidth
      ) {
        this.scrollView.scrollToEnd();
        this.setState({ dotIndex: 1 });
      } else {
        this.setState({ dotIndex: 0 });
      }
    }
  }

  render() {
    const { selectedTipOption, onTipOptionSelect } = this.props;
    const { dotIndex } = this.state;
    return (
      <View
        onLayout={this.adjustIntialScroll}
        style={{alignItems: 'center', flex: 1, backgroundColor: 'yellow'}}>
        <ScrollView
          horizontal
          onScroll={this.onScroll}
          showsHorizontalScrollIndicator={false}
          ref={this.saveRef}
          style={{
            flex: 1,
            backgroundColor: 'blue'
          }}>
          {TIPS_OPTIONS.map(option => {
            const isSelected = selectedTipOption === option;
            return (
              <TouchableOpacity
                key={option}
                onPress={onTipOptionSelect(option)}
                onLayout={this.getOptionWidth(isSelected)}
                style={{
                  padding: 8,
                  minWidth: this.state.nonSelectedOptionWidth,
                  margin: TIPS_OPTION_MARGIN,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'salmon'
                }}>
                <Text
                  style={isSelected ? styles.selectedOptionText : styles.nonSelectedOptionText
                }>
                  { `${option * 100}%`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {dotIndex > -1 && <View style={{
          flex: 1,
          flexDirection: 'row',
        }}>
          <View style={{
            height: 4,
            width: 4,
            borderRadius: 4,
            backgroundColor: dotIndex === 0 ? '#ddd' : '#eef',
            margin: 2,
          }}/>
          <View style={{
            height: 4,
            width: 4,
            borderRadius: 4,
            backgroundColor: dotIndex === 1 ? '#ddd' : '#eef',
            margin: 2,
          }}/>
        </View>}
      </View>

    );
  }
}
