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
          <Text style={styles.headertextcard}>{props.heading}</Text>
        </View>
        {deposits.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                padding: 15,
                borderBottomColor: '#ccc',
                borderBottomWidth: 0.5,
              }}>
              <Image source={item.image} style={{width: 50, height: 50}} />
              <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                <Text style={{fontSize: 15, fontWeight: '600'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 15, fontWeight: '300'}}>
                  {item.type} ({item.accountnumber})
                </Text>
              </View>
              <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    width: '100%',
                    textAlign: 'right',
                  }}>
                  {item.amount}
                </Text>
                <Text style={{fontSize: 15, fontWeight: '300'}}>
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
