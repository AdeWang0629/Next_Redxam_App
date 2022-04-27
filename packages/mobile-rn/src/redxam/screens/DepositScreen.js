import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
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

const DepositScreen = props => {
  const [tabindex, settabindex] = useState(0);
  const [Kyc, setKyc] = useState(0);
  const [droptype, setdroptype] = useState('token');
  const [showwalletdeposit, setshowwalletdeposit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modaltransVisible, setModaltransVisible] = useState(false);
  const [modelselect, setmodelselect] = useState(false);
  const [depositVisible, setdepositVisible] = useState(false);

  // split this shit
  const Kyccomponent = ({
    buttontext,
    textc,
    imaged,
    header,
    button,
    ...props
  }) => {
    return (
      <View>
        <View style={[commonestyles.cardborder, {marginTop: 30}]}>
          {(Kyc == 3 || header) && (
            <View style={styles.headercard}>
              <Text style={styles.headertextcard}>{header}</Text>
            </View>
          )}
          <View style={styles.kyctest}>
            <Image source={imaged} style={styles.imagefull} />
            <Text style={styles.kyctext}>{textc}</Text>
            {button && Kyc < 3 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(true);
                  var val = Kyc + 1;
                  setKyc(val);
                }}>
                <Text style={styles.buttontext}>{buttontext}</Text>
              </TouchableOpacity>
            )}
            {button && Kyc == 3 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModaltransVisible(true);
                  var val = Kyc + 1;
                  setKyc(val);
                }}>
                <Text style={styles.buttontext}>{buttontext}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const closedrop = () => {
    setmodelselect(!modelselect);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* split & refactor component header */}
      <View style={commonestyles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Home');
          }}>
          <Icon name="arrow-back" color={colors.white} size={30} />
        </TouchableOpacity>
        <Text style={commonestyles.headertext}>Deposit</Text>
      </View>

      <View style={commonestyles.body}>
        {/* split & refactor component deposit tab */}
        <View style={styles.headertab}>
          <TouchableOpacity
            onPress={() => settabindex(0)}
            style={tabindex == 0 ? styles.activetab : styles.singletab}>
            <Text style={tabindex == 0 ? styles.lighttext : styles.darktext}>
              Bitcoin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => settabindex(1)}
            style={tabindex == 1 ? styles.activetab : styles.singletab}>
            <Text style={tabindex == 1 ? styles.lighttext : styles.darktext}>
              Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => settabindex(2)}
            style={tabindex == 2 ? styles.activetab : styles.singletab}>
            <Text style={tabindex == 2 ? styles.lighttext : styles.darktext}>
              Bank
            </Text>
          </TouchableOpacity>
        </View>

        {/* change conditional according to applicantData */}
        {/* split & refactor component crypto deposits */}
        {/* create component for each screen */}
        {Kyc > 3 && tabindex == 0 ? (
          <ScrollView style={{marginBottom: 70}}>
            <View>
              <View style={[commonestyles.cardborder, {marginTop: 30}]}>
                <View style={styles.headercard}>
                  <Text style={styles.headertextcard}>Deposit to wallet</Text>
                </View>
                <View style={{padding: 15}}>
                  <Text style={{color: colors.black}}>
                    {' '}
                    Please select token & network
                  </Text>
                  <View style={{paddingVertical: 10}}>
                    <Text style={styles.inputspan}> Token</Text>
                    <TouchableOpacity
                      style={styles.dropdown}
                      onPress={() => {
                        closedrop();
                        setdroptype('token');
                      }}>
                      <Image
                        source={require('../assets/bitcoin.png')}
                        style={styles.imageicon}
                      />
                      <Text style={styles.dropdowntext}>Bitcoin</Text>
                      <Icon
                        name="chevron-small-down"
                        type="entypo"
                        size={25}
                        style={{marginTop: 7}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{paddingVertical: 10}}>
                    <Text style={styles.inputspan}> Network</Text>
                    <TouchableOpacity
                      style={styles.dropdown}
                      onPress={() => {
                        closedrop();
                        setdroptype('network');
                      }}>
                      <Text style={styles.dropdowntextfull}>Network</Text>
                      <Icon
                        name="chevron-small-down"
                        type="entypo"
                        size={25}
                        style={{marginTop: 7}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
                    <Text style={[styles.inputspan, {fontSize: 12}]}>
                      {' '}
                      Copy Address
                    </Text>
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                      <Text style={styles.dropdowntextfulls}>
                        0x71C7656EC7ab8.....1B7401B5f
                      </Text>
                      <Icon
                        name="copy"
                        type="feather"
                        size={25}
                        style={{marginTop: 3}}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      closedrop();
                      setdroptype('qrcode');
                    }}
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View
                      style={{
                        padding: 20,
                        backgroundColor: '#FAFAFA',
                        borderRadius: 50,
                      }}>
                      <Image
                        source={require('../assets/bi_qr-code.png')}
                        style={[styles.footerimage, {width: 40, height: 40}]}
                      />
                    </View>
                    <Text style={{fontWeight: 'bold'}}>QR Code</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : null}

        {/* change conditional according to applicantData */}
        {/* split & refactor component bank deposits */}
        {/* create component for each screen */}
        {Kyc > 3 && tabindex == 2 ? (
          <ScrollView>
            <View style={{paddingBottom: 120}}>
              <Banklist />
              <View style={styles.paddingbutton}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setdepositVisible(true);
                  }}>
                  <Text style={styles.buttontext}>Deposit to Wallet</Text>
                </TouchableOpacity>
              </View>

              {/* split into component for bank and crypto deposits */}
              <Depositlist />

              {/* split into a component */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/footer.png')}
                  style={styles.footerimage}
                />
              </View>
            </View>
          </ScrollView>
        ) : null}

        {/* split this component and create one with a type or status prop */}
        <ScrollView>
          {Kyc == 0 && (
            <Kyccomponent
              button={true}
              imaged={require('../assets/kyc.png')}
              buttontext={'Start KYC Verification'}
              textc="To continue adding a bank account to redxam you will need to complete your sumsub KYC verification."
            />
          )}
          {Kyc == 1 && (
            <Kyccomponent
              button={true}
              imaged={require('../assets/Error.png')}
              buttontext={'Check KYC Status'}
              textc="There is some issue completing your KYC, please click below to know about the problem."
            />
          )}
          {Kyc == 2 && (
            <Kyccomponent
              button={true}
              imaged={require('../assets/clock.png')}
              buttontext={'Check KYC Status'}
              textc="Your KYC verification is under progress, we will let you know via an email to your registered account."
            />
          )}
          {Kyc == 3 && (
            <Kyccomponent
              button={true}
              imaged={require('../assets/bank.png')}
              header={'Added Banks'}
              buttontext={'Add Bank Account'}
              textc="Your KYC is complete, now you can add multiple bank accounts to your redxam."
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default DepositScreen;
