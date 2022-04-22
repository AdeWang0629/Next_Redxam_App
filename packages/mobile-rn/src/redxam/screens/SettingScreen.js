import React from 'react';
import {Switch,Image,Dimensions,KeyboardAvoidingView,StatusBar,Text,View,SafeAreaView,TouchableOpacity,ScrollView} from 'react-native';
import styles from '../styles/SettingScreenStyle';
import {colors} from '../utils/Variables';
const screenWidth = Dimensions.get("window").width;

export default class SettingScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      switchValue:false,
    }

  }

  toggleSwitch = (value) => {
    this.setState({switchValue:value})
  };

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
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

      <View style={styles.mainBody}>
      <ScrollView>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{width:'100%',flexDirection:'row',marginBottom:70,marginTop:50,}}>
              <TouchableOpacity style={{width:'20%',alignItems:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
                <Image style={{width:80,resizeMode:'contain',marginTop:5}} source={require('../icons/back.png')} />
              </TouchableOpacity>
              <View style={{width:'70%'}}>
                <Text style={{fontWeight:'bold',fontSize:18}}>Settings</Text>
              </View>
            </View>

            <View style={{flexDirection:'column',padding:10,width:'100%',marginTop:-30}}>
              <Text style={{fontWeight:'bold',fontSize:18,marginLeft:25}}>Personal Settings</Text>
              <View style={{marginTop:40,flexDirection:'row',width:'90%',marginLeft:20}}>
                <View style={{width:'10%',justifyContent:'center'}}>
                  <Image style={{width:30,resizeMode:'contain',marginTop:0}} source={require('../icons/user.png')} />
                </View>
                <View style={{width:'40%',marginLeft:10,fontSize:20}}>
                  <Text style={{fontSize:16,color:'gray'}}>Personal Area</Text>
                </View>
                <View style={{width:'50%',marginLeft:0,fontSize:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <Image style={{width:40,resizeMode:'contain',marginTop:5}} source={require('../icons/arrow.png')} />
                </View>
              </View>

              <View style={{marginTop:30,flexDirection:'row',width:'90%',marginLeft:20}}>
                <View style={{width:'10%',justifyContent:'center'}}>
                  <Image style={{width:30,resizeMode:'contain',marginTop:0}} source={require('../icons/profile.png')} />
                </View>
                <View style={{width:'40%',marginLeft:10,fontSize:20}}>
                  <Text style={{fontSize:16,color:'gray'}}>Deposite Profile</Text>
                </View>
                <View style={{width:'50%',marginLeft:0,fontSize:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <Image style={{width:40,resizeMode:'contain',marginTop:5}} source={require('../icons/arrow.png')} />
                </View>
              </View>

              <View style={{marginTop:30,flexDirection:'row',width:'90%',marginLeft:20}}>
                <View style={{width:'10%',justifyContent:'center'}}>
                  <Image style={{width:30,resizeMode:'contain',marginTop:0}} source={require('../icons/linked.png')} />
                </View>
                <View style={{width:'40%',marginLeft:10,fontSize:20}}>
                  <Text style={{fontSize:16,color:'gray'}}>Linked Cards</Text>
                </View>
                <View style={{width:'50%',marginLeft:0,fontSize:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <Image style={{width:40,resizeMode:'contain',marginTop:5}} source={require('../icons/arrow.png')} />
                </View>
              </View>

            </View>

            <View style={{flexDirection:'column',padding:10,width:'100%',marginTop:20}}>
              <Text style={{fontWeight:'bold',fontSize:18,marginLeft:25}}>Device</Text>
              <View style={{marginTop:20,flexDirection:'row',width:'90%',marginLeft:20}}>
                <View style={{width:'10%',justifyContent:'center'}}>
                  <Image style={{width:30,resizeMode:'contain',marginTop:0}} source={require('../icons/noti.png')} />
                </View>
                <View style={{width:'40%',marginLeft:10,fontSize:20}}>
                  <Text style={{fontSize:16,color:'gray'}}>Notifications</Text>
                </View>
                <View style={{width:'50%',marginLeft:0,fontSize:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <Image style={{width:40,resizeMode:'contain',marginTop:5}} source={require('../icons/arrow.png')} />
                </View>
              </View>

              <View style={{marginTop:30,flexDirection:'row',width:'90%',marginLeft:20}}>
                <View style={{width:'10%',justifyContent:'center'}}>
                  <Image style={{width:30,resizeMode:'contain',marginTop:0}} source={require('../icons/lock.png')} />
                </View>
                <View style={{width:'40%',marginLeft:10,fontSize:20}}>
                  <Text style={{fontSize:16,color:'gray'}}>Change Password</Text>
                </View>
                <View style={{width:'50%',marginLeft:0,fontSize:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <Image style={{width:40,resizeMode:'contain',marginTop:5}} source={require('../icons/arrow.png')} />
                </View>
              </View>

              <View style={{marginTop:30,flexDirection:'row',width:'90%',marginLeft:20}}>
                <View style={{width:'10%',justifyContent:'center'}}>
                  <Image style={{width:30,resizeMode:'contain',marginTop:0}} source={require('../icons/face.png')} />
                </View>
                <View style={{width:'40%',marginLeft:10,fontSize:20}}>
                  <Text style={{fontSize:16,color:'gray'}}>Enable Face ID</Text>
                </View>
                <View style={{width:'50%',marginLeft:0,fontSize:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <Switch
                    trackColor='red'
                    thumbColor={this.state.switchValue ? 'white':'#38B000'}
                    style={{ marginTop: 0 }}
                    onValueChange={this.toggleSwitch}
                    value={this.state.switchValue}
                  />      
                </View>
              </View>


            </View>

            <View style={{flexDirection:'column',padding:10,width:'100%',marginTop:20}}>
              <Text style={{fontWeight:'bold',fontSize:18,marginLeft:25}}>Device</Text>
              <View style={{marginTop:20,flexDirection:'row',width:'90%',marginLeft:20}}>
                <View style={{width:'10%',justifyContent:'center'}}>
                  <Image style={{width:30,resizeMode:'contain',marginTop:0}} source={require('../icons/rate.png')} />
                </View>
                <View style={{width:'40%',marginLeft:10,fontSize:20}}>
                  <Text style={{fontSize:16,color:'gray'}}>Rate REDXAM</Text>
                </View>
                <View style={{width:'50%',marginLeft:0,fontSize:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <Image style={{width:40,resizeMode:'contain',marginTop:5}} source={require('../icons/arrow.png')} />
                </View>
              </View>

              <View style={{marginTop:30,flexDirection:'row',width:'90%',marginLeft:20}}>
                <View style={{width:'10%',justifyContent:'center'}}>
                  <Image style={{width:30,resizeMode:'contain',marginTop:0}} source={require('../icons/feed.png')} />
                </View>
                <View style={{width:'40%',marginLeft:10,fontSize:20}}>
                  <Text style={{fontSize:16,color:'gray'}}>Send Feedback</Text>
                </View>
                <View style={{width:'50%',marginLeft:0,fontSize:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <Image style={{width:40,resizeMode:'contain',marginTop:5}} source={require('../icons/arrow.png')} />
                </View>
              </View>

              <View style={{marginTop:30,flexDirection:'row',width:'90%',marginLeft:20}}>
                <View style={{width:'10%',justifyContent:'center'}}>
                  <Image style={{width:30,resizeMode:'contain',marginTop:0}} source={require('../icons/legal.png')} />
                </View>
                <View style={{width:'40%',marginLeft:10,fontSize:20}}>
                  <Text style={{fontSize:16,color:'gray'}}>legal</Text>
                </View>
                <View style={{width:'50%',marginLeft:0,fontSize:20,justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <Image style={{width:40,resizeMode:'contain',marginTop:5}} source={require('../icons/arrow.png')} />
                </View>
              </View>


            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Log Out</Text>
            </TouchableOpacity>

          </KeyboardAvoidingView>
        </View>
      </ScrollView>
     </View>      

    </SafeAreaView>  

    );
  }
}