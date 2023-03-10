import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      activeOpacity={0.8}
      onPress={() => {
        onPress();
      }}>
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    backgroundColor: '#00D1D1',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  btnTxt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
