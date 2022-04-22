import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    Dimensions
  } from 'react-native';
import {BottomSheet, Button, Icon, Card, Input} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from '../styles/DepositScreenStyle';
import {colors} from '../utils/Variables';
import commonestyles from '../CommonStyle';
const width = Dimensions.get('screen').width;
const Depositwalletlist = (props) => {
    const [data, setData] = useState([
        {
            id: 0,
            name: "Bitcoin",
            type: "Savings",
            accountnumber: '2367',
            amount: '$2000',
            date: new Date(),
            image: require('../assets/bitcoin.png')
        },
        {
            id: 1,
            name: "Bitcoin",
            type: "Savings",
            accountnumber: '6234',
            amount: '$2000',
            date: new Date(),
            image: require('../assets/bitcoin.png')
        },
    ])
    return (
        <View>
            <View style={[commonestyles.cardborder, {marginTop: 0}]}>
                <View style={styles.headercard}>
                    <Text style={styles.headertextcard}>Recent Deposits from Bank</Text>
                </View>
                {data.map((item, index)=>{
                    return(
                        <View key={index} style={{flexDirection: 'row', padding: 15, borderBottomColor: '#ccc', borderBottomWidth: 0.5}}>
                            <Image source={item.image} style={{width: 50, height: 50}} />
                            <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                                <Text style={{fontSize: 15, fontWeight: '600'}}>{item.name}</Text>
                                <Text style={{fontSize: 15, fontWeight: '300'}}>{item.type} ({item.accountnumber})</Text>
                            </View>
                            <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                                <Text style={{fontSize: 15, fontWeight: '600', width: '100%', textAlign: 'right'}}>{item.amount}</Text>
                                <Text style={{fontSize: 15, fontWeight: '300'}}>{item.date.toDateString()}</Text>
                            </View>
                        </View>
                    )
                })}
                <View style={styles.headercard}>
                    <Text style={[styles.headertextcard, {width: '100%', textAlign: 'center', textDecorationLine: 'underline'}]}>View more</Text>
                </View>
            </View>
        </View>
    );
};
export default Depositwalletlist;
