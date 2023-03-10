import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import HomeScreen from './src/screen/HomeScreen';
import {AsyncStorage} from 'react-native';
import Loader from './src/components/Loader';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState();
  const AuthUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData?.loggedIn) {
          setInitialRouteName('home');
        } else {
          setInitialRouteName('login');
        }
      } else {
        setInitialRouteName('register');
      }
    } catch (error) {
      setInitialRouteName('register');
    }
  };

  useEffect(() => {
    setTimeout(AuthUser, 2000);
  }, []);

  return (
    <NavigationContainer>
      {initialRouteName == '' ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={initialRouteName}>
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
