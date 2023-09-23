import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {commonStyles} from '../../styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {trigger} from 'react-native-haptic-feedback';
import {options} from '../../App';
import {setIsLoggedIn} from '../../redux/userSlice';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

const Settings = () => {
  const dispatch = useDispatch();

  // do logout
  const logout = async () => {
    trigger('impactMedium', options);
    await AsyncStorage.clear();
    dispatch(setIsLoggedIn(false));
    showMessage({
      message: 'See you soon 👋🙂',
      type: 'success',
      duration: 2000,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.list}>
        {/* <TouchableOpacity style={styles.listItem}>
          <FontAwesome5
            name="moon"
            size={22}
            color="black"
            backgroundColor="transparent"
          />
          <Text style={styles.itemTxt}>Set Theme</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.listItem} onPress={logout}>
          <Icon
            name="logout"
            size={22}
            color="black"
            backgroundColor="transparent"
          />
          <Text style={styles.itemTxt}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  heading: {
    color: commonStyles.darkText,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 20,
  },
  list: {
    gap: 15,
  },
  itemTxt: {
    color: commonStyles.darkText,
    fontSize: 17,
    fontWeight: '600',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
});
