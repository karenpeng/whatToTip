import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {calculateSplit} from '../../utils/money-calculator';

const styles = StyleSheet.create({
  counter: {
    borderRadius: 36,
    height: 40,
    width: 40,
    padding: 6,
    margin: 4,
    backgroundColor: '#ddd',
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
    underlayColor="#ccc"
  >
    <Text style={textStyle}>{text}</Text>
  </TouchableHighlight>
);

export default class PaymentSliptter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      splitWith: 1,
    };
  }

  updateSplitWith = isIncrement => () => {
    const { splitWith } = this.state;
    this.setState({
      splitWith: splitWith + (isIncrement ? 1 : - 1),
    });
  };

  render() {
    const { dollarSign, payment } = this.props;
    const { splitWith } = this.state;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 6,
      }}>
        <View style={{flex: 1/6, alignItems: 'flex-start'}}>
          {renderButton(
            this.updateSplitWith(false),
            '-',
            styles.counter,
            styles.counterText,
            splitWith < 2
          )}
        </View>
        <View style={{
          flex: 1/6,
          alignItems: 'center',
        }}>
          <Text style={{fontSize: 16}}>{splitWith > 1 ? splitWith : '0'}</Text>
        </View>
        <View style={{flex: 1/6, alignItems: 'flex-end'}}>
          {renderButton(
            this.updateSplitWith(true),
            '+',
            styles.counter,
            styles.counterText
          )}
        </View>
        <View style={{
          flex: 1/2,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
          {splitWith > 1 &&
            <Text style={{fontSize: 20, fontWeight: 'bold', padding: 8}}>
              {`${dollarSign}${calculateSplit(payment.total, splitWith)} each`}
            </Text>}
        </View>
      </View>
    );
  }
}
