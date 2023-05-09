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
import InputField from '../components/InputField';
import Button from '../components/Button';
import Loader from '../components/Loader';

const RegisterScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    password: '',
  });
  console.log(inputs);

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(error);

  const Validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (inputs.fullname == '') {
      handleError('fill the fullname field', 'fullname');
      valid = false;
    }
    if (inputs.email == '') {
      handleError('fill the Email', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('input the valid email', 'email');
      valid = false;
    }

    if (inputs.phonenumber == '') {
      handleError('fill the phonenumber', 'phonenumber');
      valid = false;
      // }
    } else if (inputs.phonenumber.length < 10) {
      handleError('enter the valid number', 'phonenumber');
      valid = false;
    }

    if (inputs.password == '') {
      handleError('fill the password', 'password');
      valid = false;
    } else if (inputs.password.length == 10) {
      handleError('password min 10 letters', 'password');
      valid = false;
    }

    if (valid) {
      Register();
    }
  };

  const Register = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        AsyncStorage.setItem('user', JSON.stringify(inputs));
        setInputs('');
        navigation.navigate('login');
      } catch (error) {
        Alert.alert('Warning', 'Something went wrong');
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
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Enter your Details to Register</Text>
        <View style={styles.contentContainer}>
          {/* <InputField lable="userName"  icon=""/> */}
          <InputField
            lable="Full Name"
            icon="account-outline"
            placeholder="enter the Full Name"
            onChangeText={text => handleOnChange(text, 'fullname')}
            value={inputs.fullname}
            error={error.fullname}
            onFocus={() => {
              handleError(null, 'fullname');
            }}
          />
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
            lable="Phone Number"
            icon="phone-outline"
            placeholder="enter the Phone Number"
            keyboardType="numeric"
            onChangeText={text => handleOnChange(text, 'phonenumber')}
            error={error.phonenumber}
            value={inputs.phonenumber}
            onFocus={() => {
              handleError(null, 'phonenumber');
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
              handleError(null, 'password ');
            }}
          />
          <Button title="Register" onPress={Validate} />
          <View style={styles.bottom}>
            <Text style={styles.bottomTxt}>Already I have a Account ? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('login')}
              style={{
                marginTop: 4,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{color: 'blue'}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
