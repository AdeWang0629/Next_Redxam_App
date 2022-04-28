import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils/Variables';
import commonestyles from '../CommonStyle';

const Header = ({text}) => {
  const navigation = useNavigation();
  return (
    <View style={commonestyles.header}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={commonestyles.headertext}>{text}</Text>
    </View>
  );
};

export default Header;
