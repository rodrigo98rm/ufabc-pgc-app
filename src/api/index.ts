import axios from 'axios';
import {Platform} from 'react-native';

// const BASE_URL =
//   Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const BASE_URL = 'http://192.168.0.103:3000';

export const api = axios.create({
  baseURL: BASE_URL,
});
