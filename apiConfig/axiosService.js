import axios from 'axios'
const API_REF = require('./apiConfig')

const axiosService = axios.create({
  baseURL: API_REF.HOST,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosService
