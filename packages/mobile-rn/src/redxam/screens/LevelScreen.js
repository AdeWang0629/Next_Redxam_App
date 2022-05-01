import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import Icon from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import {BlurView} from '@react-native-community/blur';
import Button from '../component/Button';
import bgImage from '../assets/signupbg-light.png';
import SocialBar from '../component/SocialBar';
import styles from '../styles/LevelScreen.style';
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
      <ImageBackground
        source={bgImage}
        resizeMode="stretch"
        style={styles.image}>
        {rendered && (
          <Shadow distance={10} viewStyle={styles.blurContainer}>
            <Text style={styles.blurFirstText}>You are</Text>
            <Text style={styles.level}>
              {signup.level}
              <Text style={styles.th}> TH</Text>
            </Text>
            <Text style={styles.blurLastText}>In Line</Text>
          </Shadow>
        )}
        <Text style={styles.titleText}>Get extra benefits by referring</Text>
        <Text style={styles.text}>
          Move up in the queue by inviting your friends with this link
        </Text>
        <View style={styles.buttonSize}>
          <Button
            text={selectedStyle => (
              <View style={styles.buttonText}>
                <Text style={selectedStyle.buttonTextStyle}>
                  Copy referral link
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.5}>
          <Text style={styles.homeText}>Go to home</Text>
        </TouchableOpacity>
        <SocialBar type="secondary" />
      </ImageBackground>
    </View>
  );
};

export default LevelScreen;
