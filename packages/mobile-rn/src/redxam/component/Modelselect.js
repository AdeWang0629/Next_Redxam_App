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
const Modelselect = (props) => {
    const [data, setData] = useState([
        {
            id: 0,
            name: "BTC",
            image: require('../assets/bitcoin.png')
        },
        {
            id: 1,
            name: "ETH",
            image: require('../assets/eth.png')
        },
        {
            id: 1,
            name: "USDT",
            image: require('../assets/usdt.png')
        },
        {
            id: 1,
            name: "BNB",
            image: require('../assets/bnb.png')
        },
        {
            id: 1,
            name: "EOS",
            image: require('../assets/eos.png')
        },
    ])
    const [bank, setBank] = useState([
        {
            id: 0,
            name: "BNB",
            fullname: "Binance Chain (BEP2)",
            active: true,
        },
        {
            id: 1,
            name: "BSC",
            fullname: "Binance Smart Chain (BEP20)",
            active: false,
        },
        {
            id: 2,
            name: "BTC",
            fullname: "Bitcoin",
            active: false,
        },
        {
            id: 3,
            name: "ETH",
            fullname: "Ethereum",
            active: false,
        },
        {
            id: 4,
            name: "SEGWITBTC",
            fullname: "BTC (SegWit)",
            active: false,
        },
    ])

    return (
        <View>
            {props.droptype == 'token' ?
            <View style={[commonestyles.cardborder, {marginTop: 30}]}>
                <View style={styles.headercard}>
                    <Text style={styles.headertextcard}>Select Token</Text>
                </View>
                {data.map((item, index)=>{
                    return(
                        <TouchableOpacity onPress={()=>props.closemodal()} key={index} style={{flexDirection: 'row', padding: 15, borderBottomColor: '#ccc', borderBottomWidth: 0.5, width: width/1.2}}>
                            <Image source={item.image} style={{width: 30, height: 30}} />
                            <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                                <Text style={{fontSize: 15, fontWeight: '600'}}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            :
            <View style={[commonestyles.cardborder, {marginTop: 30}]}>
                <View style={styles.headercard}>
                    <Text style={styles.headertextcard}>Select Network</Text>
                    <Text style={styles.simpletext}>Ensure the network you choose to deposit matches the withdrawal network, or asstes may be lost</Text>
                </View>
                {bank.map((item, index)=>{
                    return(
                        <TouchableOpacity onPress={()=>props.closemodal()} key={index} style={{flexDirection: 'row', padding: 15, backgroundColor: item.active ? '#ECF6E2' : '#fff'}}>
                            <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                                <Text style={{fontSize: 15, fontWeight: '600', color: item.active ? '#67CE0C' : '#95989B'}}>{item.name}</Text>
                                <Text style={{fontSize: 13, fontWeight: '500', color: item.active ? '#67CE0C' : '#95989B', paddingVertical: 5}}>{item.fullname}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            }
        </View>
    );
};
export default Modelselect;
