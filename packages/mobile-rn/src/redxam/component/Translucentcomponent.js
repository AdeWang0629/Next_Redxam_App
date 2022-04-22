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
const Translucentcomponent = (props) => {
  return (
    <View style={styles.TranslucentView}>
        <View style={{flexDirection: 'row', padding: 10, borderBottomWidth: 0.4, borderBottomColor: '#ccc'}}>
            <Icon name="keyboard-backspace" color={colors.black} size={20}></Icon>
            <Text style={{width: '85%', textAlign: 'center', fontSize: 15, fontWeight: '600'}}>Connect Your Bank</Text>
            <Icon name="menu" type="feather" color={colors.black} size={20}></Icon>
        </View>
        <View style={{padding: 15}}>
            <Input
                placeholder='Search bar empty'
                leftIcon={
                    <Icon
                        name='search'
                        type="evilicon"
                        size={24}
                        color='black'
                    />
                }
                leftIconContainerStyle={{paddingHorizontal: 10}}
                inputContainerStyle={{width: width-60, borderWidth: 0, fontSize: 13, backgroundColor: '#ededed', marginBottom: 5}}
            />
            <View style={{padding: 10}}>
                <Text style={{color: colors.black}}>Most Popular</Text>
            </View>
            <View style={{flexDirection: 'row', padding: 10}}>
                <Image source={{uri: "https://pbs.twimg.com/profile_images/1440303464391737346/cLVCdOYu_400x400.png"}} style={{width: 50, height: 50}} />
                <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>PayPal</Text>
                    <Text style={{fontSize: 15, fontWeight: '300'}}>www.paypal.com</Text>
                </View>
            </View>
            <TouchableOpacity onPress={()=>{props.closemodal()}} style={{width: width-60, borderWidth: 1, paddingVertical: 5, marginHorizontal: 10, alignItems : 'center'}}>
                <Text style={{color: colors.blue}}>Add a menual account</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};
export default Translucentcomponent;
