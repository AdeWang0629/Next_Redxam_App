import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  StatusBar
} from 'react-native';
import {BottomSheet, Button, Icon, Card} from 'react-native-elements';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import styles from '../styles/HomeScreenStyle';
import {colors} from '../utils/Variables';
import commonestyles from '../CommonStyle';
import Withdrawlist from '../component/Withdrawlist';
const screenWidth = Dimensions.get("window").width;

const HomeScreen = (props) => {

  useEffect(() => {
  }, []);
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
        <Image source={require('../assets/Redxam_topbar.png')} style={styles.logoStyle} />
      </View>
      <ScrollView style={commonestyles.body}>
        <View style={commonestyles.rowdirection}>
          <Text style={[commonestyles.headingtext, {width: '88%'}]}>Hello, John Doe</Text>
          <Icon name="settings" color={colors.white} size={20} style={commonestyles.blackicon} onPress={()=>props.navigation.navigate('Setting')}></Icon>
        </View>
        <View style={commonestyles.cardborder}>
          <View style={styles.user}>
            <Text style={styles.name}>Total redxam balance</Text>
            <Text style={styles.money}>$30,700.00</Text>
          </View>
          <View style={styles.cardstripe}>
            <Text style={{fontWeight: '400', fontSize: 14, color: '#95989B'}}>Your pending balance is </Text>
            <Text style={{fontWeight: '400', fontSize: 14, color: '#000'}}>$2200 </Text>
            <Icon name="information-circle-outline" type="ionicon" color={colors.gray} size={20}></Icon>
          </View>
          <View style={commonestyles.rowdirection}>
            <TouchableOpacity onPress={()=>{ props.navigation.navigate('Deposit')}} style={{width: '50%', borderRightWidth: 1, borderRightColor: '#FAFAFA'}}>
              <Text style={[commonestyles.headingtext, {width: '100%', textAlign: 'center'}]}>Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ props.navigation.navigate('Withdraw')}} style={{width: '50%'}}>
              <Text style={[commonestyles.headingtext, {width: '100%', textAlign: 'center'}]}>Withdraw</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={commonestyles.cardborder}>
          <View style={commonestyles.rowdirection}>
            <View style={{width: '65%', padding: 10}}>
              <Text style={commonestyles.headingtext}>Invite your friend</Text>
              <Text style={styles.name}>Lorem ipsum asked the dog to jump over 17 foxes, but the dog barked and asked Lorem to not order like a dog.</Text>
              <View style={[commonestyles.rowdirection, {marginTop: 20}]}>
                <Icon name="settings" color={colors.white} size={20} style={commonestyles.blackicon}></Icon>
                <Text style={commonestyles.headingtext}> Refer a Friend</Text>
              </View>
            </View>
            <View style={{width: '35%', overflow: 'hidden'}}>
              <Image style={commonestyles.refferbackground} source={require('../assets/Frame56705.png')} />
            </View>
          </View>
        </View>
        <Withdrawlist heading={'Recent Activity'}/>
        <View style={commonestyles.cardborder}>
          <View style={[commonestyles.rowdirection, {paddingTop: 15}]}>
            <View style={{width: '60%', paddingLeft: 15}}>
              <Text style={styles.name}>Performance</Text>
              <Text style={commonestyles.headingtext}>+1.5% ($250.54)</Text>
            </View>
            <View style={{width: '40%', paddingRight: 15}}>
              <Text style={[styles.name, {textAlign: 'right'}]}>Portfolio Type</Text>
              <Text style={[commonestyles.headingtext, {textAlign: 'right'}]}>Passive</Text>
            </View>
          </View>
          <View>
          <LineChart
            data={{
              labels: [],
              datasets: [
                {
                  data: [
                    Math.random(0, 99) * 100,
                    Math.random(0, 99) * 100,
                    Math.random(0, 99) * 100,
                    Math.random(0, 99) * 100,
                    Math.random(0, 99) * 100,
                    Math.random(0, 99) * 100
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width-50} // from react-native
            height={250}
            yAxisSuffix="k"
            withInnerLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            yAxisInterval={20} // optional, defaults to 1
            chartConfig={{
              backgroundColor: colors.white,
              backgroundGradientFrom: colors.white,
              backgroundGradientTo:  colors.white,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(97, 212, 4, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "1",
                strokeWidth: "2",
                stroke: colors.primaryGreen
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          </View>

          <View style={styles.headercard}>
                <Text style={[styles.headertextcard, {width: '100%', textAlign: 'center', textDecorationLine: 'underline'}]}>View Portfolio</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
            <Image  source={require('../assets/footer.png')} style={styles.footerimage} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
