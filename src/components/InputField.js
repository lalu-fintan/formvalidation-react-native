import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputField = ({
  lable,
  icon,
  password,
  error,
  value,
  onFocus = () => {},
  //   placeholder,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(password);
  return (
    <View style={{marginBottom: 20}}>
      <Text style={styles.lable}>{lable}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? 'red' : isFocus ? '#7978B5' : '#F3F4FB',
          },
        ]}>
        <Icons name={icon} size={20} style={styles.icon} />
        <TextInput
          secureTextEntry={showPassword}
          {...props}
          style={styles.input}
          placeholderTextColor="#808080"
          autoCorrect={false}
          value={value}
          onFocus={() => {
            onFocus();
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
        />
        {password &&
          (value == '' ? null : (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#7978B5"
              />
            </TouchableOpacity>
          ))}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  lable: {
    marginVertical: 5,
    fontSize: 14,
    color: '#BABBC3',
    fontWeight: '600',
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#F3F4FB',
    borderRadius: 5,
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  icon: {
    color: '#7978B5',
    marginRight: 10,
  },
  input: {
    flex: 1,
    width: '95%',
    color: '#7978B5',
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
});
