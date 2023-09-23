import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {commonStyles} from '../../styles/commonStyles';

const Header = ({title, desc}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>{title}</Text>
      <Text style={styles.smallTxt}>{desc}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.bgColor,
    // alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTxt: {
    fontSize: 22,
    color: commonStyles.darkText,
    fontWeight: '900',
    textTransform: 'uppercase',
    // letterSpacing: 5,
  },
  smallTxt: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '900',
  },
});
