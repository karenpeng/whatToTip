import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {calculateSplit} from '../../utils/money-calculator';

const styles = StyleSheet.create({
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

export default class PaymentSliptter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      splitWith: 1,
    };
  }

  updateSliptWith = isIncrement => () => {
    const { splitWith } = this.state;
    this.setState({
      splitWith: splitWith + (isIncrement ? 1 : - 1),
    });
  };

  render() {
    const { dollarSign, payment } = this.props;
    return (
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
              {`${dollarSign}${calculateSplit(payment.total, splitWith)} each`}
            </Text>}
        </View>
      </View>
    );
  }
}
