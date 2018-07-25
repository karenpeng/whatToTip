import React from 'react';
import { Text, View } from 'react-native';

import TipsOptionSwiper from './tips-option-swiper';
import PaymentSliptter from './payment-splitter';

export default PaymentControlPanel = props => {
  const { payment, dollarSign, onTipOptionSelect } = props;
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      padding: 10,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'black',
    }}>
      <Text style={{margin: 4}}>Tip%</Text>
      <View style={{flexDirection: 'row'}}>
        <TipsOptionSwiper onTipOptionSelect={onTipOptionSelect}/>
      </View>
      <Text style={{margin: 4}}># People split</Text>
      <PaymentSliptter dollarSign={dollarSign} payment={payment}/>
    </View>
  );
}
