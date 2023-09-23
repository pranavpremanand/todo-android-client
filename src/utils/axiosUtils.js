import axios from 'axios';
import {baseUrl} from '../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const request = axios.create({baseURL: baseUrl});

// export const request = async () => {
//   const token = await AsyncStorage.getItem('token');
//   request.defaults.headers.common['Authorization'] = 'Bearer' + token;
// };

request.interceptors.request.use(async req => {
  const token = await AsyncStorage.getItem('token');
  req.headers.authorization = 'Bearer ' + token;
  return req;
});
