import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import styles from '../styles/LoginScreenStyle';

// actions
import {login} from '../../redux/actions/loginActions';
import {userVerified} from '../../redux/actions/userActions';
import {BASE_URL} from '@env';

const socket = io(BASE_URL);

const screenWidth = Dimensions.get('window').width;
const {height, width} = Dimensions.get('window');

const LoginScreen = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.login.isLogin);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    socket.on('userVerified', token => {
      dispatch(userVerified(token));
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const handleLoggin = () => {
    socket.emit('onLogin', emailInput);
    dispatch(login(emailInput));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainBody}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          {isLogin && <LoginModal />}
          <View>
            <KeyboardAvoidingView enabled>
              <View style={{alignItems: 'center', marginBottom: 50}}>
                <Image
                  style={{width: 120, resizeMode: 'contain'}}
                  source={require('../icons/logo.png')}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    marginBottom: 50,
                  }}>
                  Login
                </Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  label="Email"
                  outline="none"
                  style={styles.inputStyle}
                  placeholder="Email"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onChangeText={text => setEmailInput(text)}
                  value={emailInput}
                />
              </View>

              <View style={styles.remtop}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image source={require('../icons/remember.png')} />
                  <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                    Remember me
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'gray', fontWeight: 'bold'}}>
                    Forgot password?
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleLoggin}
                style={styles.buttonStyle}
                activeOpacity={0.5}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
              <View style={styles.rows}>
                <Text style={styles.registerTextStyle}>
                  Don't have an account ?
                </Text>
                <Text style={styles.registerTextStyle2}>Sign up</Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const LoginModal = () => (
  <View style={styles.modalContainer}>
    <View style={styles.modalBox}>
      <Text style={styles.modalText}>
        Please confirm the verification link sent to your email
      </Text>
    </View>
  </View>
);

export default LoginScreen;
