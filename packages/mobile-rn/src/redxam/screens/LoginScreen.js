import React from 'react';
import {Dimensions,Image,TextInput,KeyboardAvoidingView,StyleSheet,Text,View,SafeAreaView,TouchableOpacity,ScrollView} from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../utils/Variables';
import styles from '../styles/LoginScreenStyle';

const screenWidth = Dimensions.get("window").width;
const {height ,width}=Dimensions.get('window');

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
          switchValue:false,
        }
    
    }
    
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1,justifyContent: 'center',alignContent: 'center',}}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center',marginBottom:50}}>
              <Image style={{width:120,resizeMode:'contain'}} source={require('../icons/logo.png')} />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight:'bold',fontSize:30,marginBottom:50}}>Login</Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                label="Email"
                outline="none"
                style={styles.inputStyle}
                placeholder="Username" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            <View style={styles.remtop}>
              <View style={{flexDirection:'row',width:'50%',justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../icons/remember.png')} />
                <Text style={{fontWeight:'bold',marginLeft:10}}>Remember me</Text>
              </View>
              <View style={{flexDirection:'row',width:'50%',alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'gray',fontWeight:'bold'}}>Forgot password?</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('Home')}
              style={styles.buttonStyle}
              activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.rows}>
              <Text style={styles.registerTextStyle}>
                Don't have an account ? 
              </Text>
              <Text style={styles.registerTextStyle2}>
              Sign up 
              </Text>
            </View>

          </KeyboardAvoidingView>
        </View>
      </ScrollView>
     </View>      
    </SafeAreaView>  
   );
  }
}