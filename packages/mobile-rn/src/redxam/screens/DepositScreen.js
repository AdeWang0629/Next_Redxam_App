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
import Depositlist from '../component/Depositlist';
import Depositwalletlist from '../component/Depositwalletlist';
import Modelselect from '../component/Modelselect';
import Qrcode from '../component/Qrcode';
import AddDeposit from '../component/AddDeposit';

const DepositScreen = (props) => {
    const [tabindex, settabindex] = useState(0);
    const [Kyc, setKyc] = useState(0);
    const [droptype, setdroptype] = useState('token');
    const [showwalletdeposit, setshowwalletdeposit] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modaltransVisible, setModaltransVisible] = useState(false);
    const [modelselect, setmodelselect] = useState(false);
    const [depositVisible, setdepositVisible] = useState(false);

    const Kyccomponent = ({buttontext, textc, imaged, header, button, ...props}) => {
        return(
            <View>
                <View style={[commonestyles.cardborder, {marginTop: 30}]}>
                    {(Kyc == 3 || header) &&
                        <View style={styles.headercard}>
                            <Text style={styles.headertextcard}>{header}</Text>
                        </View>
                    }
                    <View style={styles.kyctest}>
                        <Image  source={imaged} style={styles.imagefull} />
                        <Text style={styles.kyctext}>
                            {textc}
                        </Text>
                        {button && Kyc < 3 &&
                            <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(true); var val = Kyc+1; setKyc(val)}}>
                                <Text style={styles.buttontext}>
                                    {buttontext}
                                </Text>
                            </TouchableOpacity>
                        }
                        {button && Kyc == 3 &&
                            <TouchableOpacity style={styles.button} onPress={() => {setModaltransVisible(true); var val = Kyc+1; setKyc(val)}}>
                                <Text style={styles.buttontext}>
                                    {buttontext}
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }

    const Modalcomponent = ({buttontext, textc, imaged, ...props}) => {
        return(
            <View style={styles.modalView}>
                {Kyc == 1 && <Text style={styles.modalText}>SELFIE</Text>}
                {Kyc == 2 && <Text style={[styles.modalText, {color: colors.red}]}>
                    <Icon name="warning" type="antdesign" color={colors.red} size={15} style={{marginRight: 10}} />
                    PAUSED
                </Text>}
                {Kyc == 3 && <Text style={[styles.modalText, {color: colors.primaryGreen}]}>
                    <Icon name="checkcircle" type="antdesign" color={colors.primaryGreen} size={15} style={{marginRight: 10}} />
                    COMPLETED
                </Text>}
                <Text style={styles.modaltextfont}>Face the camera. Ensure your frame within the frame. Then, slowly turn your head around the circle.</Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image  source={require('../assets/photo.png')} style={styles.photoimage} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="arrow-back" color={'black'} size={15} style={styles.icontext}/>
                    <Text style={styles.textdarkStyle} onPress={() => setModalVisible(!modalVisible)}>
                        BACK
                    </Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>I'M READY</Text>
                    </Pressable>
                    <Text style={[styles.textdarkStyle, {color: 'white', paddingVertical: 0}]}>
                        <Icon name="arrow-back" color={'white'} size={15} style={styles.icontext}/>
                        BACK
                    </Text>
                </View>
                <Text style={styles.continueonphone}>or continue on a phone</Text>
            </View>
        )
    }

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
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <Modalcomponent imaged={require('../assets/kyc.png')} buttontext={"Start KYC Verification"} textc="To continue adding a bank account to redxam you will need to complete your sumsub KYC verification." />
            </View>
        </Modal>
        <Modal
            animationType="slide"
            transparent={false}
            visible={modaltransVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModaltransVisible(!modaltransVisible);
            }}
        >
            <View style={styles.DatacenteredView}>
                <Translucentcomponent closemodal={closemodal} props={props} />
            </View>
        </Modal>
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
                <AddDeposit closemodal={closedeposit} props={props} />
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
                {droptype == 'qrcode' ? 
                    <Qrcode closemodal={closedrop} droptype={droptype} props={props} />
                    :
                    <Modelselect closemodal={closedrop} droptype={droptype} props={props} />
                }
            </View>
        </Modal>

        <View style={commonestyles.header}>
            <TouchableOpacity onPress={()=>{ props.navigation.navigate('Home')}}>
                <Icon name="arrow-back" color={colors.white} size={30} />
            </TouchableOpacity>
            <Text style={commonestyles.headertext} >Deposit</Text>
        </View>
        <View style={commonestyles.body}>
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
            {(Kyc > 3 && tabindex == 0) ? 
            <ScrollView style={{marginBottom: 70}}>
                <View>
                    <View style={[commonestyles.cardborder, {marginTop: 30}]}>
                        <View style={styles.headercard}>
                            <Text style={styles.headertextcard}>Deposit to wallet</Text>
                        </View>
                        <View style={{padding: 15}}>
                            <Text style={{color: colors.black}} > Please select token & network</Text>
                            <View style={{paddingVertical: 10}}>
                                <Text style={styles.inputspan} > Token</Text>
                                <TouchableOpacity style={styles.dropdown} onPress={()=>{closedrop(); setdroptype('token')}}>
                                    <Image source={require('../assets/bitcoin.png')} style={styles.imageicon} />
                                    <Text style={styles.dropdowntext}>Bitcoin</Text>
                                    <Icon name="chevron-small-down" type="entypo" size={25} style={{marginTop: 7}} />
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingVertical: 10}}>
                                <Text style={styles.inputspan} > Network</Text>
                                <TouchableOpacity style={styles.dropdown} onPress={()=>{closedrop(); setdroptype('network')}}>
                                    <Text style={styles.dropdowntextfull}>Network</Text>
                                    <Icon name="chevron-small-down" type="entypo" size={25} style={{marginTop: 7}} />
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
                                <Text style={[styles.inputspan, {fontSize: 12}]} > Copy Address</Text>
                                <TouchableOpacity style={{flexDirection: 'row'}}>
                                    <Text style={styles.dropdowntextfulls}>0x71C7656EC7ab8.....1B7401B5f</Text>
                                    <Icon name="copy" type="feather" size={25} style={{marginTop: 3}} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={()=>{closedrop(); setdroptype('qrcode')}} style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{padding: 20, backgroundColor: '#FAFAFA', borderRadius: 50}}>
                                    <Image  source={require('../assets/bi_qr-code.png')} style={[styles.footerimage, {width: 40, height: 40}]} />
                                </View>
                                <Text style={{fontWeight: 'bold'}}>QR Code</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                {showwalletdeposit == true ? 
                    <Depositwalletlist />
                    :
                    <TouchableOpacity onPress={()=>setshowwalletdeposit(true)}>
                        <Kyccomponent button={false} imaged={require('../assets/depositimg.png')} header={"Deposit to Wallet"} buttontext={"Add Bank Account"} textc="No transactions has been made from any & of the added bank accounts." />
                    </TouchableOpacity>
                }
            </ScrollView>
            : null}

            {Kyc > 3 && tabindex == 2 ? (
                <ScrollView>
                    <Banklist />
                    <View style={styles.paddingbutton}>
                        <TouchableOpacity style={styles.button} onPress={() => {setdepositVisible(true);}}>
                            <Text style={styles.buttontext}>
                            Deposit to Wallet
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Depositlist />
                </ScrollView> )
                : null
            }
            <ScrollView>
                {Kyc == 0 && <Kyccomponent button={true} imaged={require('../assets/kyc.png')} buttontext={"Start KYC Verification"} textc="To continue adding a bank account to redxam you will need to complete your sumsub KYC verification." /> }
                {Kyc == 1 && <Kyccomponent button={true} imaged={require('../assets/Error.png')} buttontext={"Check KYC Status"} textc="There is some issue completing your KYC, please click below to know about the problem." /> }
                {Kyc == 2 && <Kyccomponent button={true} imaged={require('../assets/clock.png')} buttontext={"Check KYC Status"} textc="Your KYC verification is under progress, we will let you know via an email to your registered account." /> }
                {Kyc == 3 && <Kyccomponent button={true} imaged={require('../assets/bank.png')} header={"Added Banks"} buttontext={"Add Bank Account"} textc="Your KYC is complete, now you can add multiple bank accounts to your redxam." /> }
                {Kyc == 3 && <Kyccomponent button={false} imaged={require('../assets/notransaction.png')} header={"Recent Deposits from Bank"} buttontext={"Add Bank Account"} textc="No transactions has been made from any of the added bank accounts." /> }
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image  source={require('../assets/footer.png')} style={styles.footerimage} />
                </View>
            </ScrollView>
        </View>

        </SafeAreaView>
    );
};
export default DepositScreen;
