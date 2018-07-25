import React from 'react';
import { Text, View } from 'react-native';

import TipsOptionSwiper from './tips-option-swiper';
import PaymentSliptter from './payment-splitter';

export default PaymentControlPanel = props => {
  const { payment, dollarSign, onTipOptionSelect, selectedTipOption } = props;
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      padding: 10,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    }}>
      <Text style={{margin: 4}}>Tip%</Text>
      <View style={{flexDirection: 'row'}}>
        <TipsOptionSwiper
          onTipOptionSelect={onTipOptionSelect}
          selectedTipOption={selectedTipOption}/>
      </View>
      <Text style={{margin: 4}}># People split</Text>
      <PaymentSliptter dollarSign={dollarSign} payment={payment}/>
    </View>
  );
}
