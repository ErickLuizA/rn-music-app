import axios from 'axios';

const ytApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

export default ytApi;
