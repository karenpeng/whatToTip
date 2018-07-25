import {
  Text,
  View,
} from 'react-native';

const renderDollarItem = (item, dollarSign) => (
  <View style={{flexDirection: 'row', margin: 8}} key={item[0]}>
    <View>
      <Text style={{fontSize: 16}}>{`${item[0]}`.toUpperCase()}</Text>
    </View>
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{`${dollarSign}${item[1]}`}</Text>
    </View>
  </View>
);

const PaymentDisplay = (props) => (
  <View style={{
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  }}>
    {Object.entries(props.payment.map(item => renderDollarItem(item, props.dollarSign)))}
  </View>
);

PaymentDisplay.displayName = 'PaymentDisplay';

export PaymentDisplay = PaymentDisplay;
