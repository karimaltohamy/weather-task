import axios from 'axios'

const apiAxios = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default apiAxios
