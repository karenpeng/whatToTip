import React from 'react';
import { View, Text } from 'react-native';

import {calculateTips, getDollarSign} from '../../utils/payment-calculator';
import TipsOptionSwiper from './tips-option-swiper';
import PaymentSliptter from './payment-splitter';

const renderDollarItem = (item, dollarSign) => (
  <View style={{flexDirection: 'row', margin: 4}} key={item[0]}>
    <View>
      <Text style={{fontSize: 16}}>{`${item[0]}`.toUpperCase()}</Text>
    </View>
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{`${dollarSign}${item[1]}`}</Text>
    </View>
  </View>
);

export default Payment = props => {
  const { result, tipOption, onTipOptionSelect } = props;
  const paymentResults = calculateTips(result);
  const payment = paymentResults[tipOption];
  const dollarSign = getDollarSign(result);
  return (
    <View>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eef',
      }}>
        <Text style={{margin: 4}}>Tip%</Text>
        <View style={{flexDirection: 'row', flex: 1}}>
          <TipsOptionSwiper
            onTipOptionSelect={onTipOptionSelect}
            selectedTipOption={tipOption}/>
        </View>
        <Text style={{margin: 4}}># People split</Text>
        <PaymentSliptter dollarSign={dollarSign} payment={payment}/>
      </View>
      <View style={{
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
      }}>
        {Object.entries(payment).map(item => renderDollarItem(item, dollarSign))}
      </View>
    </View>
  );
}
