import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {TipsOptionSwiper} from './tips-option-swiper';
import {PaymentSliptter} from './payment-splitter';

export default class TipsControlPanel extends React.Component {
  render() {
    const { payment, dollarSign, onTipOptionSelect } = this.props;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        marginBottom: 10,
      }}>
        <Text style={{margin: 4, color: 'white'}}>Tip%</Text>
        <View style={{flexDirection: 'row'}}>
          <TipsOptionSwiper onTipOptionSelect={onTipOptionSelect}/>
        </View>
        <Text style={{margin: 4, color: 'white'}}># People split</Text>
        <PaymentSliptter dollarSign={dollarSign} payment={payment}/>
      </View>
    );
  }
}
