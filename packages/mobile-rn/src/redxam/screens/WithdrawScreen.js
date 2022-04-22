import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  StatusBar,
  Alert, Modal, Pressable
} from 'react-native';
import {BottomSheet, Button, Icon, Card} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from '../styles/DepositScreenStyle';
import {colors, TRANSITIONS} from '../utils/Variables';
import commonestyles from '../CommonStyle';
import Translucentcomponent from '../component/Translucentcomponent';
import Banklist from '../component/Banklist';
import Withdrawlist from '../component/Withdrawlist';
import Depositwalletlist from '../component/Depositwalletlist';
import Modelselect from '../component/Modelselect';
import Qrcode from '../component/Qrcode';
import AddDeposit from '../component/AddDeposit';
import AddWithdraw from '../component/AddWithdraw';

const WithdrawScreen = (props) => {
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
    const [tabindex, settabindex] = useState(0);
    const [Kyc, setKyc] = useState(0);
    const [droptype, setdroptype] = useState('token');
    const [showwalletdeposit, setshowwalletdeposit] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modaltransVisible, setModaltransVisible] = useState(false);
    const [modelselect, setmodelselect] = useState(false);
    const [depositVisible, setdepositVisible] = useState(false);

    const closemodal = () => {
        setModaltransVisible(!modaltransVisible);
    }
    const closedrop = () => {
        setmodelselect(!modelselect);
    }
    const closedeposit = () => {
        setdepositVisible(!depositVisible);
    }
    

    return (
        <SafeAreaView style={styles.mainContainer}>
        <StatusBar
            animated={true}
            translucent
            backgroundColor={colors.primaryGreen}
            barStyle={colors.statusbarstyle[2]}
            showHideTransition={TRANSITIONS[0]}
            hidden={false} 
        />

        <Modal
            animationType="slide"
            transparent={false}
            visible={depositVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setdepositVisible(!depositVisible);
            }}
        >
            <View style={styles.DatacenteredView}>
                <AddWithdraw closemodal={closedeposit} props={props} />
            </View>
        </Modal>

        <Modal
            animationType="slide"
            transparent={false}
            visible={modelselect}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setmodelselect(!modelselect);
            }}
        >
            <View style={styles.DatacenteredView}>
                <Modelselect closemodal={closedrop} droptype={droptype} props={props} />
            </View>
        </Modal>

        <View style={commonestyles.header}>
            <TouchableOpacity onPress={()=>{ props.navigation.navigate('Home')}}>
                <Icon name="arrow-back" color={colors.white} size={30} />
            </TouchableOpacity>
            <Text style={commonestyles.headertext} >Withdraw</Text>
        </View>
        <View style={commonestyles.body}>
            <View style={{paddingVertical: 10, marginBottom: 10}}>
                <Text style={styles.inputspan} > Coin</Text>
                <TouchableOpacity style={styles.dropdown} onPress={()=>{closedrop(); setdroptype('token')}}>
                    <Image source={require('../assets/bitcoin.png')} style={styles.imageicon} />
                    <Text style={styles.dropdowntext}>Bitcoin</Text>
                    <Icon name="chevron-small-down" type="entypo" size={25} style={{marginTop: 7}} />
                </TouchableOpacity>
            </View>
            <View style={commonestyles.rowdirection}>
                {data.map((item, index)=>{
                    return(
                        <TouchableOpacity onPress={closedeposit} key={index} style={{padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 0.5, alignItems: 'center'}}>
                            <View style={styles.iconrowlist}>
                                <Image source={item.image} style={{width: 30, height: 30}} />
                            </View>
                            <View style={{paddingVertical: 5}}>
                                <Text style={{fontSize: 15, fontWeight: '600'}}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View style={styles.headertab}>
                <TouchableOpacity onPress={()=>settabindex(0)} style={tabindex == 0 ? styles.activetab : styles.singletab}>
                    <Text style={tabindex == 0 ? styles.lighttext : styles.darktext}>Bitcoin</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>settabindex(1)} style={tabindex == 1 ? styles.activetab : styles.singletab}>
                    <Text style={tabindex == 1 ? styles.lighttext : styles.darktext}>Card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>settabindex(2)} style={tabindex == 2 ? styles.activetab : styles.singletab}>
                    <Text style={tabindex == 2 ? styles.lighttext : styles.darktext}>Bank</Text>
                </TouchableOpacity>
            </View>


            <ScrollView>
                <Withdrawlist heading={'Wallet'} />
            </ScrollView> 
        </View>

        </SafeAreaView>
    );
};
export default WithdrawScreen;
