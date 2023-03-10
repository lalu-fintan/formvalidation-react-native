import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';

const Loader = ({visible = true}) => {
  const {height, width} = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.loader, {height, width}]}>
        <View style={styles.loader1}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.text}>Loading</Text>
        </View>
      </View>
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
    justifyContent: 'center',
  },
  loader1: {
    height: 60,
    // backgroundColor: '#fff',
    marginHorizontal: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
