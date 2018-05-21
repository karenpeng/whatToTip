import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import idx from 'idx';

import {calculateTips, calculateSplit} from '../calculator';

const TIP_OPTIONS = ['15%', '18%', '20%'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  selectedOption: {
    borderRadius: 20,
    padding: 15,
    margin: 3,
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  selectedOptionText: {
    color: 'white',
    fontSize: 14,
  },
  nonSelectedOption: {
    borderRadius: 20,
    padding: 15,
    margin: 3,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  nonSelectedOptionText: {
    fontSize: 14
  },
  incrementor: {
    borderRadius: 30,
    padding: 10,
    margin: 6,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  incrementorText: {
    fontSize: 14,
  },
});

const renderButton = (onPress, text, touchableStype, textStyle, disabled) => (
  <TouchableOpacity
    onPress={onPress}
    style={touchableStype}
    disabled={disabled}
  >
    <Text style={textStyle}>{text}</Text>
  </TouchableOpacity>
);

const renderDollarItem = item => (
  <View style={{flexDirection: 'row', margin: 4}}>
    <View>
      <Text style={{fontSize: 16}}>{`${item[0]}`.toUpperCase()}</Text>
    </View>
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{`$${item[1]}`}</Text>
    </View>
  </View>
);

export default class Tips extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tipOption: '15%',
      splitWith: 1,
    };
  }

  selectTipOptions = tipOption => () => {
    this.setState({ tipOption });
  };

  renderTipOptions = () => TIP_OPTIONS.map(tipOption => (
    <View style={{flex: 1/3}} key={tipOption}>
      {renderButton(
        this.selectTipOptions(tipOption),
        tipOption,
        tipOption === this.state.tipOption ? styles.selectedOption : styles.nonSelectedOption,
        tipOption === this.state.tipOption ? styles.selectedOptionText : styles.nonSelectedOptionText)
      }
    </View>
  ));

  updateSliptWith = isIncrement => () => {
    const { splitWith } = this.state;
    this.setState({
      splitWith: splitWith + ( isIncrement ? 1 : - 1 ),
    });
  };

  render() {
    const results = calculateTips(this.props.amount);
    const { tipOption, splitWith } = this.state;
    return (
      <View style={{
        flex: 0,
        flexDirection: 'row',
      }}>
        <View style={{
          flex: 0.5,
          padding: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }}>
          <Text>Tip%</Text>
          <View style={{flexDirection: 'row'}}>
            {this.renderTipOptions()}
          </View>
          <Text># ppl split</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1/3}}>
              {renderButton(
                this.updateSliptWith(false),
                '-',
                styles.incrementor,
                styles.incrementorText,
                splitWith < 2
              )}
            </View>
            <View style={{
              flex: 1/3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={styles.incrementorText}>{splitWith > 1 ? splitWith : ''}</Text>
            </View>
            <View style={{flex: 1/3}}>
              {renderButton(
                this.updateSliptWith(true),
                '+',
                styles.incrementor,
                styles.incrementorText
              )}
            </View>
          </View>
        </View>
        <View style={{
          flex: 0.5,
          padding: 4,
          backgroundColor: 'white',
        }}>
          {Object.entries(results[tipOption]).map(result => renderDollarItem(result))}
          {splitWith > 1 &&
            renderDollarItem(['per person', calculateSplit(results[tipOption].total, splitWith)])
          }
        </View>
      </View>
    );
  }
}
