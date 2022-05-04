import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Button from '../component/Button';
import bgImage from '../assets/signupbg-nocard.png';
import SocialBar from '../component/SocialBar';
import styles from '../styles/SignupFormScreen.style';
import commonestyles from '../CommonStyle';
import logo from '../assets/redxam-logo-white.png';

// Actions
import {signup} from '../../redux/actions/signupActions';

const SignupFormScreen = ({navigation}) => {
  const signupData = useSelector(state => state.signup, shallowEqual);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    referral: '',
  });

  useFocusEffect(() => {
    if (signupData.isDone) {
      navigation.navigate('Level');
    }
  });

  useEffect(() => {
    if (signupData.signupError) {
      Alert.alert(signupData.signupError);
    }
  }, [signupData.signupError]);

  const onTextChange = (text, field) => {
    setForm(e => ({...e, [field]: text}));
  };

  const handleSignup = async () => {
    await dispatch(signup(form));
  };

  return (
    <View style={styles.container}>
      {signupData.isLoading && (
        <View style={commonestyles.modalContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
        <Image source={logo} style={commonestyles.logo} resizeMode="contain" />
        <KeyboardAvoidingView enabled>
          <View>
            <Text style={styles.titleText}>Join the Waitlist</Text>
            <Text style={styles.text}>
              Sign up for alpha and be the first to be notified when we lauch
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                label="Firstname"
                outline="none"
                style={styles.input}
                placeholder="First name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={text => onTextChange(text, 'firstName')}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Lastname"
                outline="none"
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={text => onTextChange(text, 'lastName')}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Email"
                outline="none"
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={text => onTextChange(text, 'email')}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="referral"
                outline="none"
                style={styles.input}
                placeholder="Referral code"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={text => onTextChange(text, 'referral')}
              />
            </View>
            <Button text="Sign up!" onClick={handleSignup} />
          </View>
          <SocialBar />
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default SignupFormScreen;
