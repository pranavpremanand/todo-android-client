import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {commonStyles} from '../../styles/commonStyles';
import {TextInput} from 'react-native-paper';
import Header from '../Header/Header';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import {api, baseUrl} from '../../apis';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn} from '../../redux/userSlice';

const Signup = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {name: '', email: '', password: ''},
  });

  const doSignup = async values => {
    try {
      values = {...values, email: values.email.toLowerCase()};
      const response = await axios.post(`${baseUrl}${api.signup}`, values);
      if (response.data.success) {
        showMessage({
          message: response.data.message,
          type: 'success',
          duration: 2000,
        });
        await AsyncStorage.setItem('token', response.data.accessToken);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.data));
        dispatch(setIsLoggedIn(true));
      } else {
        showMessage({
          message: response.data.message,
          type: 'warning',
          duration: 2000,
        });
      }
    } catch (err) {
      showMessage({
        message: `${err.message} 😵‍💫`,
        type: 'danger',
        duration: 2000,
      });
    }
  };
  return (
    <>
      <Header title={'Welcome'} desc={'Signup into your account'} />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.formBg}>
            <Text style={styles.heading}>Sign Up</Text>
            <Controller
              control={control}
              rules={{
                required: 'Full name is required',
                validate: value => {
                  if (value.trim() === '') {
                    return 'Full name is required';
                  }
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  style={styles.textInput}
                  textColor={commonStyles.bgColor}
                  theme={{colors: {primary: commonStyles.bgColor}}}
                  label="Full Name"
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={styles.errorTxt}>{errors.name?.message}</Text>
            )}
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid email address',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  style={styles.textInput}
                  textColor={commonStyles.bgColor}
                  theme={{colors: {primary: commonStyles.bgColor}}}
                  label="Email"
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorTxt}>{errors.email?.message}</Text>
            )}

            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                maxLength: {
                  value: 16,
                  message: 'Password must be at most 16 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="default"
                  style={styles.textInput}
                  textColor={commonStyles.bgColor}
                  theme={{colors: {primary: commonStyles.bgColor}}}
                  label="Password"
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      color={commonStyles.bgColor}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorTxt}>{errors.password?.message}</Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit(doSignup)}
              style={styles.button}>
              <Text style={styles.buttonTxt}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.linkBox}>
          <Text style={styles.linkTxt}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.linkTxt, {color: commonStyles.blueBg}]}>
              Login here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.bgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formBg: {
    gap: 6,
    paddingVertical: 40,
    paddingHorizontal: 25,
    margin: 20,
    justifyContent: 'center',
    backgroundColor: commonStyles.blueBg,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 10,
  },
  headerText: {
    fontSize: 24,
    color: commonStyles.darkText,
    fontWeight: '800',
    textTransform: 'uppercase',
    backgroundColor: commonStyles.lightText,
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  formContainer: {
    width: '100%',
  },
  heading: {
    fontSize: 24,
    color: commonStyles.lightText,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: commonStyles.blueBg,
    color: commonStyles.darkText,
    borderWidth: 1,
    borderColor: commonStyles.bgColor,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTxt: {
    fontSize: 17,
    fontWeight: '900',
    color: commonStyles.blueBg,
    textTransform: 'uppercase',
  },
  linkBox: {
    alignItems: 'center',
    top: 10,
  },
  linkTxt: {
    color: commonStyles.darkText,
  },
  errorTxt: {
    color: '#B4161B',
  },
});
