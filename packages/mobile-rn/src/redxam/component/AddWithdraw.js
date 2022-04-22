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
const AddWithdraw = (props) => {
  return (
    <View style={[styles.TranslucentView, {borderRadius: 25}]}>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          borderBottomWidth: 0.4,
          borderBottomColor: '#ccc',
        }}>
        <Text style={{width: '90%', fontSize: 20, fontWeight: '400'}}>
          Withdraw
        </Text>
        <Icon
          name="closecircle"
          onPress={() => props.closemodal()}
          type="antdesign"
          color={colors.black}
          size={25}></Icon>
      </View>

      <View style={styles.madels1}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/5825.png')}
            style={styles.madelimage1}
          />
          <View style={{padding: 15, paddingLeft: 10}}>
            <Text style={{fontSize: 16, color: '#61D404', fontWeight: '500'}}>
              Redxam wallet
            </Text>
          </View>
        </View>
      </View>

      <View style={{padding: 20}}>
        <Icon
          name="arrowdown"
          type="antdesign"
          color={colors.black}
          size={25}></Icon>
      </View>
      <View style={styles.madels}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../assets/bankof.png')}
            style={styles.madelimage}
          />
          <View style={{padding: 10, paddingLeft: 8}}>
            <Text style={{fontSize: 15, color: '#000000', fontWeight: '500'}}>
              Bank Of America
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#98A3AA',
                padding: 5,
                fontWeight: '400',
              }}>
              Savings (2367)
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingLeft: 55}}>
          <Text
            style={{
              fontSize: 12,
              color: '#98A3AA',
              textAlign: 'center',
              fontWeight: '400',
            }}>
            Click to select source bank
          </Text>
          <Icon
            name="caretdown"
            type="antdesign"
            color={colors.lightgrey}
            size={12}
            paddingLeft={5}></Icon>
        </View>
      </View>
      <View style={styles.modelamount}>
        <View style={{flexDirection: 'row'}}>
        <Input
                placeholder='2500.00'
                value={'2500.00'}
                leftIcon={
                    <Icon
                        name='currency-usd'
                        type="material-community"
                        size={40}
                        color={colors.primaryGreen}
                    />
                }
                leftIconContainerStyle={{paddingHorizontal: 10}}
                inputStyle={{fontSize: 35, fontWeight: 'bold'}}
                inputContainerStyle={{width: '100%', borderBottomWidth: 0, borderWidth: 0, fontSize: 33, marginBottom: 5}}
        />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 12,
              color: '#98A3AA',
              textAlign: 'center',
              fontWeight: '400',
            }}>
            Enter amount you want to Withdraw
          </Text>
        </View>

      </View>
        <View style={{paddingTop: 30}}>
            <TouchableOpacity style={[styles.button, {width: width/1.5}]} onPress={() => {props.closemodal()}}>
                <Text style={[styles.buttontext]}>
                    Copy Address
                </Text>
            </TouchableOpacity>
        </View>
      
    </View>
  );
};
export default AddWithdraw;
