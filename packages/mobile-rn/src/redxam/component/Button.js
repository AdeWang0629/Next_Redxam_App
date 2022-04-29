import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './Button.style';

const buttonStylesMap = {
  primary: {
    buttonStyle: styles.buttonStylePrimary,
    buttonTextStyle: styles.buttonTextStylePrimary,
  },
};

const Button = ({type = 'primary', text, onClick}) => {
  const selectedStyle = buttonStylesMap[type];
  return (
    <TouchableOpacity
      onPress={onClick}
      style={selectedStyle.buttonStyle}
      activeOpacity={0.5}>
      {typeof text === 'string' ? (
        <Text style={selectedStyle.buttonTextStyle}>{text}</Text>
      ) : (
        {text}
      )}
    </TouchableOpacity>
  );
};

export default Button;
