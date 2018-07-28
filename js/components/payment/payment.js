import React from 'react';
import { View, AsyncStorage } from 'react-native';
import idx from 'idx';

import {calculateTips, getDollarSign} from '../../utils/money-calculator';
import PaymentControlPanel from './payment-control-panel';
import PaymentDisplay from './payment-display';

const TIPS_OPTION_KEY = '@MyTipOption';

export default class Payment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tipOption: 0.15,
    };
  }

  componentDidMount() {
    try {
      const tipOption = await AsyncStorage.getItem(TIPS_OPTION_KEY);
      if (tipOption !== null) {
        this.setState({ tipOption });
      }
    } catch (error) {
     console.log(error);
    }
  };

  onTipOptionSelect = tipOption => async() => {
    this.setState({ tipOption });
    try {
      await AsyncStorage.setItem(TIPS_OPTION_KEY, tipOption);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const paymentResults = calculateTips(this.props.result);
    const dollarSign = getDollarSign(this.props.result);
    const { tipOption, splitWith } = this.state;
    return (
      <View>
        <PaymentControlPanel
          payment={paymentResults[tipOption]}
          dollarSign={dollarSign}
          selectedTipOption={tipOption}
          onTipOptionSelect={this.onTipOptionSelect}/>
        <PaymentDisplay
          payment={paymentResults[tipOption]}
          dollarSign={dollarSign}/>
      </View>
    );
  }
}
