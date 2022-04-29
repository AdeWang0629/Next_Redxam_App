import React from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import Button from '../component/Button';
import bgImage from '../assets/signupbg.png';
import SocialBar from '../component/SocialBar';
import styles from '../styles/SignupScreen.style';

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImage}
        resizeMode="stretch"
        style={styles.image}>
        <Text style={styles.titleText}>Get ahead of the Waitlist</Text>
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
