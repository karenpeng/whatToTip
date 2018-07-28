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
    this.onTipOptionLoad();
  };

  onTipOptionLoad = async() => {
    try {
      const tipOptionResult = await AsyncStorage.getItem(TIPS_OPTION_KEY);
      if (typeof tipOptionResult === 'string') {
        const tipOption = parseFloat(tipOptionResult);
        if (!Number.isNaN(tipOption)) {
          this.setState({ tipOption });
        }
      }
    } catch (error) {
     console.log(error);
    }
  };

  onTipOptionSelect = tipOption => async() => {
    this.setState({ tipOption });
    try {
      await AsyncStorage.setItem(TIPS_OPTION_KEY, `${tipOption}`);
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
