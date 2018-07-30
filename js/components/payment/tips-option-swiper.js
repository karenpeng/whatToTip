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

const getSelectedIndex = option => TIPS_OPTIONS.indexOf(option);

const getWidth = event => idx(event, _ => _.nativeEvent.layout.width);

const calculateWithparams = (params, cb) => {
  const { selectedoptionWidth, nonSelectedOptionWidth, viewWidth } = params;
  if (!selectedoptionWidth || !nonSelectedOptionWidth || !viewWidth) {
    return false;
  }
  return cb(params);
};

const needsScroll = params =>
  calculateWithparams(params, params => {
    const { selectedoptionWidth, nonSelectedOptionWidth, viewWidth } = params;
    return (
      TIPS_OPTION_MARGIN * 2 * TIPS_OPTIONS.length +
      nonSelectedOptionWidth * (TIPS_OPTIONS.length - 1) +
      selectedoptionWidth > viewWidth
    );
  });

const shouldScrollRight = params =>
  calculateWithparams(params, params => {
    const { selectedoptionWidth, nonSelectedOptionWidth, viewWidth, selectedIndex } = params;
    return (
      TIPS_OPTION_MARGIN * 2 * (selectedIndex + 1) +
      nonSelectedOptionWidth * selectedIndex +
      selectedoptionWidth > viewWidth
    );
  });

const shouldScrollLeft = params =>
  calculateWithparams(params, params => {
    const { selectedoptionWidth, nonSelectedOptionWidth, viewWidth, selectedIndex } = params;
    return (
      TIPS_OPTION_MARGIN * 2 * (TIPS_OPTIONS.length - selectedIndex) +
      nonSelectedOptionWidth * (TIPS_OPTIONS.length - selectedIndex - 1) +
      selectedoptionWidth > viewWidth
    );
  });

export default class TipsOptionSwiper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedoptionWidth: null,
      nonSelectedOptionWidth: null,
      viewWidth: null,
      selectedIndex: getSelectedIndex(this.props.selectedTipOption),
      dotIndex: -1,
    };
  }

  saveRef = ref => (this.scrollView = ref);

  getOptionWidth = isSelected => event => {
    const width = getWidth(event);
    if (width) {
      this.setState({
        [isSelected ? 'selectedoptionWidth' : 'nonSelectedOptionWidth']: width
      });
    }
  };

  getViewWidth = event => {
    const viewWidth = getWidth(event);
    if (viewWidth) {
      this.setState({ viewWidth });
    }
    return viewWidth;
  };

  adjustScroll = params => {
    if (this.state.dotIndex === 0 && shouldScrollRight(params)) {
      this.scrollView.scrollToEnd();
      this.setState({ dotIndex: 1 });
    } else if (this.state.dotIndex === 1 && shouldScrollLeft(params)) {
      this.scrollView.scrollTo({x: 0, y : 0, animated: true});
      this.setState({ dotIndex: 0 });
    }
  };

  onWholeLayout = event => {
    const viewWidth = this.getViewWidth(event);
    const params = { ...this.state, viewWidth };
    if (!needsScroll(params)) {
      return;
    }
    this.setState({ dotIndex: 0 });
    this.adjustScroll({ ...params, dotIndex: 0 });
  };

  onOptionSelect = option => async() => {
    await this.props.onTipOptionSelect(option);
    this.adjustScroll({ ...this.state, selectedIndex: getSelectedIndex(option) });
  }

  onScroll = event => {
    console.log(event.nativeEvent)
    const offset = idx(event, _ => _.nativeEvent.contentOffset.x);
    const width = idx(event, _ => _.nativeEvent.layoutMeasurement.width);
    console.log(this.state)
  }

  render() {
    const { selectedTipOption } = this.props;
    const { dotIndex } = this.state;
    return (
      <View
        onLayout={this.onWholeLayout}
        style={{ flex: 1, alignItems: 'center', }}>
        <ScrollView
          onScroll={this.onScroll}
          ref={this.saveRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{
            flex: 1,
          }}>
          {TIPS_OPTIONS.map(option => {
            const isSelected = selectedTipOption === option;
            return (
              <TouchableOpacity
                key={option}
                onPress={this.onOptionSelect(option)}
                onLayout={this.getOptionWidth(isSelected)}
                style={{
                  padding: 8,
                  minWidth: this.state.nonSelectedOptionWidth,
                  margin: TIPS_OPTION_MARGIN,
                  justifyContent: 'center',
                  alignItems: 'center',
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
            backgroundColor: dotIndex === 0 ? '#bbc' : '#eef',
            margin: 2,
          }}/>
          <View style={{
            height: 4,
            width: 4,
            borderRadius: 4,
            backgroundColor: dotIndex === 1 ? '#bbc' : '#eef',
            margin: 2,
          }}/>
        </View>}
      </View>

    );
  }
}
