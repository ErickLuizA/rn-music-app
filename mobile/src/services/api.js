import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.0.107:3333',
  baseURL: 'https://yfmusic.herokuapp.com',
});

export default api;
