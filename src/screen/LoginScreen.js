import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Loader from '../components/Loader';

const LoginScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const Validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (inputs.email == '') {
      handleError('fill the Email', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('input the valid email', 'email');
      valid = false;
    }

    if (inputs.password == '') {
      handleError('fill the password', 'password');
      valid = false;
    } else if (inputs.password.length > 8) {
      handleError('password min 8', 'password');
      valid = false;
    }

    if (valid) {
      Login();
    }
  };

  const Login = () => {
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem(
            'user',
            JSON.stringify({...userData, loggedIn: true}),
          );
          navigation.navigate('home');
          setInputs('');
        } else {
          Alert.alert('Error', 'Invalid Details ');
        }
      } else {
        Alert.alert('Error', "User doesn't exist ");
      }
    }, 2000);
  };

  handleOnChange = (text, input) => {
    setInputs(pre => ({...pre, [input]: text}));
  };

  const handleError = (error, input) => {
    setError(prev => ({...prev, [input]: error}));
  };
  return (
    <SafeAreaView style={styles.RegContainer}>
      <Loader visible={isLoading} />
      <ScrollView contentContainerStyle={styles.subRegContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Enter your Details to Login</Text>
        <View style={styles.contentContainer}>
          <InputField
            lable="Email"
            icon="email-outline"
            placeholder="enter the Email"
            onChangeText={text => handleOnChange(text, 'email')}
            error={error.email}
            value={inputs.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
          />

          <InputField
            lable="Password"
            icon="lock-outline"
            placeholder="enter the Password"
            password
            onChangeText={text => handleOnChange(text, 'password')}
            error={error.password}
            value={inputs.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
          />
          <Button title="Login" onPress={Validate} />
          <View style={styles.bottom}>
            <Text style={styles.bottomTxt}>I Don't have a account </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('register')}
              style={{
                marginTop: 4,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{color: 'blue'}}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  RegContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  subRegContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: '#000',
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#BABBC3',
    fontSize: 18,
    marginVertical: 10,
  },
  contentContainer: {
    marginVertical: 20,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomTxt: {
    paddingTop: 5,
    color: '#000',
    fontSize: 14,
  },
});
