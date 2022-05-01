import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const linkedinUrl = 'https://www.linkedin.com/company/redxam/mycompany/';
const twitterUrl = 'https://twitter.com/redxamapp';
const facebookUrl = 'https://www.facebook.com/redxamenglish';
const emailUrl = 'mailto:hello@redxam.com';

const colorMap = {
  primary: '#fff',
  secondary: '#5EB12F',
};

const SocialBar = ({type = 'primary'}) => {
  const color = colorMap[type];
  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name="facebook-f"
        size={25}
        color={color}
        onPress={async () => await Linking.openURL(facebookUrl)}
      />
      <Icon
        style={styles.icon}
        name="twitter"
        size={25}
        color={color}
        onPress={async () => await Linking.openURL(twitterUrl)}
      />
      <Icon
        style={styles.icon}
        name="linkedin"
        size={25}
        color={color}
        onPress={async () => await Linking.openURL(linkedinUrl)}
      />
      <Icon
        style={styles.icon}
        name="envelope"
        size={25}
        color={color}
        onPress={async () => await Linking.openURL(emailUrl)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  icon: {
    marginHorizontal: 20,
  },
});

export default SocialBar;
