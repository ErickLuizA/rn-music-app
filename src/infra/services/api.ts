import axios from 'axios'

const api = axios.create({
  baseURL: 'https://yfmusic.herokuapp.com/api',
})

export default api
