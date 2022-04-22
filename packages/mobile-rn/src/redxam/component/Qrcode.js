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
const Qrcode = (props) => {

    return (
        <TouchableOpacity onPress={()=>props.closemodal()}>
            <View style={[commonestyles.cardborder, {marginTop: 30}]}>
                <View style={[styles.headercard, {justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={[styles.headertextcard, {fontSize: 15, textAlign: 'center'}]}>Scan the code on the withdrawal page of the trading platform  App or wallet App</Text>
                    <Image  source={require('../assets/bi_qr-code.png')} style={[styles.footerimage, {width: width-width/4, height: 350}]} />

                </View>
                <View style={[styles.headertextcard, {paddingHorizontal: 30, paddingBottom: 20}]}>
                    <Text style={styles.listtext}>Send only BTC to this deposit address</Text>
                    <Text style={styles.listtext}>Ensure the network is bitcoin</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default Qrcode;
