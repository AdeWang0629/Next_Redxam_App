import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {BottomSheet, Button, Icon, Card, Input} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from '../styles/DepositScreenStyle';
import {colors} from '../utils/Variables';
import commonestyles from '../CommonStyle';
import {useSelector} from 'react-redux';
import ListItemSwipeable from 'react-native-elements/dist/list/ListItemSwipeable';

const width = Dimensions.get('screen').width;
const Withdrawlist = props => {
  const [data, setData] = useState([]);

  const deposits = useSelector(state => state.deposits.deposits);

  useEffect(() => {
    setData(deposits);
  }, [deposits]);

  return (
    <View>
      <View style={[commonestyles.cardborder, {marginTop: 20}]}>
        <View style={styles.headercard}>
          <Text style={[styles.headertextcard, {color: '#000'}]}>
            {props.heading}
          </Text>
        </View>
        {deposits.map((item, index) => {
          console.log(item);
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: 20,
                paddingHorizontal: 5,
                borderBottomColor: '#ccc',
                borderBottomWidth: 0.5,
                width: '88%',
              }}>
              <Image
                source={require('../assets/bankPlaceholder.png')}
                style={{width: 40, height: 40, marginRight: 10}}
              />
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{fontSize: 15, fontWeight: '600'}}>
                    {item.type === 'CRYPTO' ? 'BITCOIN' : item.bankName}
                  </Text>
                  <Text style={{fontSize: 15, fontWeight: '300'}}>
                    Processed
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      textAlign: 'right',
                    }}>
                    {item.currency === 'USD' ? '$' : item.currency}{' '}
                    {item.type === 'FIAT'
                      ? item.amount
                      : item.amount * 0.00000001}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '300',
                      textAlign: 'right',
                    }}>
                    {new Date(item.timestamp).toLocaleDateString(undefined, {
                      day: '2-digit',
                      month: 'short',
                    })}
                    {', '}
                    {new Date(item.timestamp).toLocaleTimeString(undefined, {
                      minute: '2-digit',
                      hour: '2-digit',
                    })}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
        <View style={styles.headercard}>
          <Text
            style={[
              styles.headertextcard,
              {
                width: '100%',
                textAlign: 'center',
                textDecorationLine: 'underline',
              },
            ]}>
            View more
          </Text>
        </View>
      </View>
    </View>
  );
};
export default Withdrawlist;
