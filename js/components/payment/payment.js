import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import idx from 'idx';

import {calculateTips, getDollarSign} from '../../utils/money-calculator';
import {PaymentControlPanel} from './payment-control-panel';
import {PaymentDisplay} from './payment-display';

export default class Payment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // TODO: read from local storage
      tipOption: 0.15,
    };
  }

  onTipOptionSelect = tipOption => () => {
    this.setState({ tipOption });
  };

  render() {
    const paymentResults = calculateTips(this.props.result);
    const dollarSign = getDollarSign(this.props.result);
    const { tipOption, splitWith } = this.state;
    return (
      <View style={{
        backgroundColor: 'black',
      }}>
        <PaymentontrolPanel
          payment={paymentResults[tipOption]}
          dollarSign={dollarSign}
          onTipOptionSelect={this.onTipOptionSelect}/>
        <PaymentDisplay
          payment={paymentResults[tipOption]}
          dollarSign={dollarSign}/>
      </View>
    );
  }
}
