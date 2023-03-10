import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logOut = () => {
    AsyncStorage.setItem(
      'user',
      JSON.stringify({...userDetails, loggedIn: false}),
      navigation.navigate('login'),
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Welcome {userDetails?.fullname}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          logOut();
        }}>
        <Text style={styles.txt1}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  txt: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  btn: {
    height: 60,
    width: 300,
    backgroundColor: '#00D1D1',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  txt1: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
