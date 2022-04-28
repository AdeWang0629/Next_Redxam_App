import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles/DepositScreenStyle';

const Tabulation = ({options, tab, setTab}) => {
  return (
    <View style={styles.headertab}>
      {options.map((opt, i) => (
        <TouchableOpacity
          onPress={() => setTab(i)}
          style={tab === i ? styles.activetab : styles.singletab}>
          <Text style={tab === i ? styles.lighttext : styles.darktext}>
            {opt}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabulation;
