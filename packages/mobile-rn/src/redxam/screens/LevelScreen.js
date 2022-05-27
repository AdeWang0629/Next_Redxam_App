import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import Button from '../component/Button';
import bgImage from '../assets/signupbg-light.png';
import SocialBar from '../component/SocialBar';
import styles from '../styles/LevelScreen.style';
import commonestyles from '../CommonStyle';
import logo from '../assets/redxam-logo-black.png';
import logoTransparent from '../assets/redxam-logo-transparent.png';

import {PAGE_URL} from '@env';

const LevelScreen = ({navigation}) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() =>
    navigation.addListener(
      'beforeRemove',
      e => {
        if (e.data.action.type === 'GO_BACK') {
          e.preventDefault();
        }
      },
      [navigation],
    ),
  );

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
    }
  }, [rendered]);

  const signup = useSelector(state => state.signup);
  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
        <Image source={logo} style={commonestyles.logo} resizeMode="contain" />

        {rendered && (
          <Shadow distance={10} viewStyle={styles.blurContainer}>
            <Text style={styles.blurFirstText}>You are</Text>
            <Text style={styles.level}>
              {signup.level}
              <Text style={styles.th}> TH</Text>
            </Text>
            <Text style={styles.blurLastText}>In Line</Text>
            <Image
              source={logoTransparent}
              style={styles.logo}
              resizeMode="contain"
            />
          </Shadow>
        )}
        <Text style={styles.titleText}>
          Get <Text style={styles.underline}>extra</Text> benefits by{' '}
          <Text style={styles.bold}>referring</Text>
        </Text>
        <Text style={styles.text}>
          Move up in the queue by inviting your friends with this link
        </Text>
        <View style={styles.buttonSize}>
          <Button
            text={selectedStyle => (
              <View style={styles.buttonTextContainer}>
                <Text
                  style={[selectedStyle.buttonTextStyle, styles.buttonText]}>
                  {`${PAGE_URL}/referral=${signup.referralCode}`}
                </Text>
                <Icon name="copy" size={20} color="#fff" />
              </View>
            )}
            type="secondary"
            onClick={() =>
              Clipboard.setString(`${PAGE_URL}/referral=${signup.referralCode}`)
            }
          />
        </View>
        <SocialBar type="secondary" />
      </ImageBackground>
    </View>
  );
};

export default LevelScreen;
