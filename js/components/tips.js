import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import idx from 'idx';

import {calculateTips, calculateSplit, TIP_OPTIONS} from '../money-calculator';

const styles = StyleSheet.create({
  selectedOption: {
    borderRadius: 10,
    padding: 15,
    margin: 3,
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  selectedOptionText: {
    color: 'white',
    fontSize: 14,
  },
  nonSelectedOption: {
    borderRadius: 10,
    padding: 15,
    margin: 3,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  nonSelectedOptionText: {
    fontSize: 14
  },
  counter: {
    borderRadius: 10,
    height: 46,
    width: 60,
    padding: 6,
    margin: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 14,
  },
});

const renderButton = (onPress, text, touchableStype, textStyle, disabled) => (
  <TouchableOpacity
    onPress={onPress}
    style={touchableStype}
    disabled={disabled}
  >
    <Text style={textStyle}>{text}</Text>
  </TouchableOpacity>
);

const renderDollarItem = item => (
  <View style={{flexDirection: 'row', margin: 4}} key={item[0]}>
    <View>
      <Text style={{fontSize: 16}}>{`${item[0]}`.toUpperCase()}</Text>
    </View>
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{`$${item[1]}`}</Text>
    </View>
  </View>
);

export default class Tips extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tipOption: 0.15,
      splitWith: 1,
    };
  }

  selectTipOptions = tipOption => () => {
    this.setState({ tipOption });
  };

  renderTipOptions = () => TIP_OPTIONS.map(tipOption => (
    <View style={{flex: 1/TIP_OPTIONS.length}} key={tipOption}>
      {renderButton(
        this.selectTipOptions(tipOption),
        `${tipOption * 100}%`,
        tipOption === this.state.tipOption ? styles.selectedOption : styles.nonSelectedOption,
        tipOption === this.state.tipOption ? styles.selectedOptionText : styles.nonSelectedOptionText)
      }
    </View>
  ));

  updateSliptWith = isIncrement => () => {
    const { splitWith } = this.state;
    this.setState({
      splitWith: splitWith + (isIncrement ? 1 : - 1),
    });
  };

  render() {
    const results = calculateTips(this.props.amount);
    const { tipOption, splitWith } = this.state;
    return (
      <View>
        <View style={{
          flex: 1,
          padding: 4,
        }}>
          <Text style={{margin: 4}}>Tip%</Text>
          <View style={{flexDirection: 'row'}}>
            {this.renderTipOptions()}
          </View>
          <Text style={{margin: 4}}># People split</Text>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{flex: 2/9, alignItems: 'flex-start'}}>
              {renderButton(
                this.updateSliptWith(false),
                '-',
                styles.counter,
                styles.counterText,
                splitWith < 2
              )}
            </View>
            <View style={{
              flex: 2/9,
              alignItems: 'center',
            }}>
              <Text style={styles.counterText}>{splitWith > 1 ? splitWith : '0'}</Text>
            </View>
            <View style={{flex: 2/9, alignItems: 'flex-end'}}>
              {renderButton(
                this.updateSliptWith(true),
                '+',
                styles.counter,
                styles.counterText
              )}
            </View>
            <View style={{
              flex: 1/3,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
              {splitWith > 1 &&
                <Text style={{fontSize: 20, fontWeight: 'bold', padding: 4}}>
                  {`$${calculateSplit(results[tipOption].total, splitWith)} each`}
                </Text>}
            </View>
          </View>
        </View>
        <View style={{
          flex: 1,
          padding: 6,
          backgroundColor: 'white',
        }}>
          {Object.entries(results[tipOption]).map(result => renderDollarItem(result))}
        </View>
      </View>
    );
  }
}
