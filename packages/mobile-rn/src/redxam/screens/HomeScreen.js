import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import {BottomSheet, Button, Icon, Card} from 'react-native-elements';
import {LineChart} from 'react-native-chart-kit';
import styles from '../styles/HomeScreenStyle';
import {colors} from '../utils/Variables';
import commonestyles from '../CommonStyle';
import Withdrawlist from '../component/Withdrawlist';
const screenWidth = Dimensions.get('window').width;

const HomeScreen = props => {
  const [percentChange, setPercentChange] = useState(0);
  const [dolarChange, setDolarChange] = useState(0);
  const user = useSelector(state => state.user.userData);
  const home = useSelector(state => state.user.homeData);
  const balanceRecords = useSelector(state => state.user.balanceRecords);

  let performanceBalances = [];

  useEffect(() => {
    if (home.percentChange && home.dolarChange) {
      setPercentChange(home.percentChange);
      setDolarChange(home.dolarChange);
    }
  }, [home]);

  if (balanceRecords) {
    balanceRecords.map(balanceRecord =>
      performanceBalances.push(balanceRecord.balance),
    );
  } else {
    performanceBalances.push(0, 0, 0, 0);
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor={colors.primaryGreen}
        barStyle={colors.statusbarstyle[2]}
        hidden={false}
      />

      <View style={styles.header}>
        <Image
          source={require('../assets/Redxam_topbar.png')}
          style={styles.logoStyle}
        />
      </View>
      <ScrollView style={commonestyles.body}>
        <View style={commonestyles.rowdirection}>
          <Text style={[commonestyles.headingtext, {width: '88%'}]}>Hello</Text>
          <Icon
            name="settings"
            color={colors.white}
            size={20}
            style={commonestyles.blackicon}
            onPress={() => props.navigation.navigate('Setting')}
          />
        </View>
        <View style={commonestyles.cardborder}>
          <View style={styles.user}>
            <Text style={styles.name}>Total redxam balance</Text>
            <Text style={styles.money}>${home.balance.toFixed(4)}</Text>
          </View>
          <View style={styles.cardstripe}>
            <Text style={{fontWeight: '400', fontSize: 14, color: '#95989B'}}>
              Your pending balance is{' '}
            </Text>
            <Text style={{fontWeight: '400', fontSize: 14, color: '#000'}}>
              {user.pending_balance.toFixed(2)}{' '}
            </Text>
            <Icon
              name="information-circle-outline"
              type="ionicon"
              color={colors.gray}
              size={20}
            />
          </View>
          <View style={commonestyles.rowdirection}>
            <TouchableOpacity
              disabled={true}
              onPress={() => {
                props.navigation.navigate('Deposit');
              }}
              style={{
                width: '50%',
                borderRightWidth: 1,
                borderRightColor: '#FAFAFA',
              }}>
              <Text
                opacity={0.5}
                style={[
                  commonestyles.headingtext,
                  {width: '100%', textAlign: 'center'},
                ]}>
                Deposit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Withdraw');
              }}
              style={{width: '50%'}}>
              <Text
                style={[
                  commonestyles.headingtext,
                  {width: '100%', textAlign: 'center'},
                ]}>
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={commonestyles.cardborder}>
          <View style={commonestyles.rowdirection}>
            <View style={{width: '65%', padding: 10}}>
              <Text style={commonestyles.headingtext}>Invite your friend</Text>
              <Text style={styles.name}>
                Get rewarded when a friend adds money to redxam.
              </Text>
              <View style={[commonestyles.rowdirection, {marginTop: 20}]}>
                <Icon
                  name="settings"
                  color={colors.white}
                  size={20}
                  style={commonestyles.blackicon}
                />
                <Text style={commonestyles.headingtext}> Refer a Friend</Text>
              </View>
            </View>
            <View style={{width: '35%', overflow: 'hidden'}}>
              <Image
                style={commonestyles.refferbackground}
                source={require('../assets/Frame56705.png')}
              />
            </View>
          </View>
        </View>
        <Withdrawlist heading={'Recent Activity'} />
        <View style={commonestyles.cardborder}>
          <View style={[commonestyles.rowdirection, {paddingTop: 15}]}>
            <View style={{width: '60%', paddingLeft: 15}}>
              <Text style={styles.name}>Performance</Text>
              <Text style={commonestyles.headingtext}>{`${percentChange.toFixed(
                2,
              )}% ($${dolarChange.toFixed(2)})`}</Text>
            </View>
            <View style={{width: '40%', paddingRight: 15}}>
              <Text style={[styles.name, {textAlign: 'right'}]}>
                Portfolio Type
              </Text>
              <Text style={[commonestyles.headingtext, {textAlign: 'right'}]}>
                Passive
              </Text>
            </View>
          </View>
          <View>
            <LineChart
              data={{
                labels: [],
                datasets: [
                  {
                    data: performanceBalances,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 50} // from react-native
              height={250}
              yAxisSuffix="k"
              withInnerLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              yAxisInterval={20} // optional, defaults to 1
              chartConfig={{
                backgroundColor: colors.white,
                backgroundGradientFrom: colors.white,
                backgroundGradientTo: colors.white,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(97, 212, 4, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '1',
                  strokeWidth: '2',
                  stroke: colors.primaryGreen,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>

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
              View Portfolio
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Image
            source={require('../assets/footer.png')}
            style={styles.footerimage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
