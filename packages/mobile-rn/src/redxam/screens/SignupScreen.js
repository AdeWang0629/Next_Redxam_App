import React from 'react';
import {ImageBackground, Text, View, Image} from 'react-native';
import Button from '../component/Button';
import SocialBar from '../component/SocialBar';
import styles from '../styles/SignupScreen.style';
import commonestyles from '../CommonStyle';
import bgImage from '../assets/signupbg.png';
import logo from '../assets/redxam-logo-white.png';

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
        <Image source={logo} style={commonestyles.logo} resizeMode="contain" />
        <Text style={styles.titleText}>
          Get <Text style={styles.underline}>ahead</Text> of the{' '}
          <Text style={styles.boldy}>waitlist</Text>
        </Text>
        <Text style={styles.text}>
          Move up in the queue by inviting your friends with this link
        </Text>
        <Button
          text="join the waitlist"
          onClick={() => navigation.navigate('SignupForm')}
        />
        <SocialBar />
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen;
