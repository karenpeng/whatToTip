import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import idx from 'idx';

import {calculateTips, calculateSplit, TIP_OPTIONS} from '../money-calculator';

const styles = StyleSheet.create({
  selectedOption: {
    borderRadius: 16,
    padding: 15,
    margin: 6,
    alignItems: 'center',
    backgroundColor: '#00a5ff',
  },
  selectedOptionText: {
    color: 'white',
    fontSize: 16,
  },
  nonSelectedOption: {
    borderRadius: 16,
    padding: 15,
    margin: 6,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  nonSelectedOptionText: {
    fontSize: 14
  },
  counter: {
    borderRadius: 16,
    height: 46,
    width: 60,
    padding: 6,
    margin: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 16,
  },
});

const renderButton = (onPress, text, touchableStype, textStyle, disabled) => (
  <TouchableHighlight
    onPress={onPress}
    style={touchableStype}
    disabled={disabled}
    underlayColor="#00a5ff"
  >
    <Text style={textStyle}>{text}</Text>
  </TouchableHighlight>
);

const renderDollarItem = item => (
  <View style={{flexDirection: 'row', margin: 8}} key={item[0]}>
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
      <View style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderColor: 'rgba(0, 0, 0, 0.6)',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
      }}>
        <View style={{alignItems: 'center'}}>
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: 8,
            borderWidth: 1,
            marginTop: 8,
            height: 3,
            width: 56,
          }}/>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          padding: 10,
          marginBottom: 10,
        }}>
          <Text style={{margin: 8, color: 'white'}}>Tip%</Text>
          <View style={{flexDirection: 'row'}}>
            {this.renderTipOptions()}
          </View>
          <Text style={{margin: 8, color: 'white'}}># People split</Text>
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
              <Text style={{fontSize: 16, color: 'white'}}>{splitWith > 1 ? splitWith : '0'}</Text>
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
                <Text style={{fontSize: 20, fontWeight: 'bold', padding: 8, color: 'white'}}>
                  {`$${calculateSplit(results[tipOption].total, splitWith)} each`}
                </Text>}
            </View>
          </View>
        </View>
        <View style={{
          flex: 1,
          padding: 10,
          backgroundColor: 'white',
        }}>
          {Object.entries(results[tipOption]).map(result => renderDollarItem(result))}
        </View>
      </View>
    );
  }
}
