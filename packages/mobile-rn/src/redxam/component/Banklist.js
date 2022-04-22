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
const Banklist = (props) => {
    const [data, setData] = useState([
        {
            id: 0,
            name: "Bank of America",
            type: "Savings",
            accountnumber: '2367',
            image: require('../assets/boa.png')
        },
        {
            id: 1,
            name: "Citigroup Inc.",
            type: "Checking",
            accountnumber: '6234',
            image: require('../assets/citi.png')
        },
    ])
    return (
        <View>
            <View style={[commonestyles.cardborder, {marginTop: 30}]}>
                <View style={styles.headercard}>
                    <Text style={styles.headertextcard}>Added Banks</Text>
                </View>
                {data.map((item, index)=>{
                    return(
                        <View key={index} style={{flexDirection: 'row', padding: 15, borderBottomColor: '#ccc', borderBottomWidth: 0.5}}>
                            <Image source={item.image} style={{width: 50, height: 50}} />
                            <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                                <Text style={{fontSize: 15, fontWeight: '600'}}>{item.name}</Text>
                                <Text style={{fontSize: 15, fontWeight: '300'}}>{item.type} ({item.accountnumber})</Text>
                            </View>
                        </View>
                    )
                })}
                <View style={styles.headercard}>
                    <Text style={[styles.headertextcard, {width: '100%', textAlign: 'center', textDecorationLine: 'underline'}]}>Add Bank Account</Text>
                </View>
            </View>
        </View>
    );
};
export default Banklist;
